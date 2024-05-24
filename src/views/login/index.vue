<template>
  <div class="login-container">
    <div class="login-container__switch absolute-lt flex-x-end p-3 w-full">
      <!-- 顶部 -->

      <el-switch
        v-model="isDark"
        inline-prompt
        :active-icon="Moon"
        :inactive-icon="Sunny"
        @change="toggleTheme"
      />
      <lang-select class="ml-2 cursor-pointer" />
    </div>
    <el-card class="!border-none !bg-transparent !rounded-4% w-100 <sm:w-85">
      <div class="text-center relative">
        <h2>{{ defaultSettings.title }}</h2>
      </div>
      <el-form
        ref="loginFormRef"
        :model="loginData"
        :rules="loginRules"
        class="login-form"
      >
        <el-form-item prop="username">
          <div class="flex-y-center w-full">
            <svg-icon icon-class="user" class="mx-2" />
            <el-input
              ref="username"
              v-model="loginData.username"
              :placeholder="$t('login.username')"
              name="username"
              size="large"
              class="h-[48px]"
            />
          </div>
        </el-form-item>

        <!-- 密码 -->
        <el-tooltip
          :visible="isCapslock"
          :content="$t('login.capsLock')"
          placement="right"
        >
          <el-form-item prop="password">
            <div class="flex-y-center w-full">
              <svg-icon icon-class="lock" class="mx-2" />
              <el-input
                v-model="loginData.password"
                :placeholder="$t('login.password')"
                type="password"
                name="password"
                @keyup="checkCapslock"
                @keyup.enter="handleLogin"
                size="large"
                class="h-[48px] pr-2"
                show-password
              />
            </div>
          </el-form-item>
        </el-tooltip>

        <!-- 验证码 -->
        <el-form-item prop="captchaCode">
          <div class="flex-y-center w-full">
            <svg-icon icon-class="captcha" class="mx-2" />
            <el-input
              v-model="loginData.captchaCode"
              auto-complete="off"
              size="large"
              class="flex-1"
              :placeholder="$t('login.captchaCode')"
              @keyup.enter="handleLogin"
            />

            <el-image
              @click="getCaptcha"
              :src="captchaBase64"
              class="rounded-tr-md rounded-br-md cursor-pointer h-[48px]"
            />
          </div>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-button
          :loading="loading"
          type="primary"
          size="large"
          class="w-full"
          @click.prevent="handleLogin"
          >{{ $t("login.login") }}
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Sunny, Moon } from "@element-plus/icons-vue";
import { LoginData } from "@/service/auth/types";
import AuthAPI from "@/service/auth";
import defaultSettings from "@/settings";
import { useUserStore, useSettingsStore } from "@/store";
import { LocationQuery, LocationQueryValue } from "vue-router";
import { ThemeEnum } from "@/enums/ThemeEnum";
import router from "@/router";
const { t } = useI18n();
const route = useRoute();

const userStore = useUserStore();
const settingsStore = useSettingsStore();

const captchaBase64 = ref(); // 验证码图片Base64字符串

const isDark = ref(settingsStore.theme === ThemeEnum.DARK);
const isCapslock = ref(false); // 是否大写锁定
const loading = ref(false);
const loginData = ref<LoginData>({
  username: "admin",
  password: "123456",
});
const loginRules = computed(() => {
  return {
    username: [
      {
        required: true,
        trigger: "blur",
        message: t("login.message.username.required"),
      },
    ],
    password: [
      {
        required: true,
        trigger: "blur",
        message: t("login.message.password.required"),
      },
      {
        min: 6,
        message: t("login.message.password.min"),
        trigger: "blur",
      },
    ],
    captchaCode: [
      {
        required: true,
        trigger: "blur",
        message: t("login.message.captchaCode.required"),
      },
      {
        trigger: "change",
        validator: (rule: any, value: string, callback: any) => {
          if (value === "0") {
            // 验证码正确，现在是mock接口获取的验证码图片，因此只需要这样判断就行，实际接口可以通过数据获取验证码是否正确
            callback();
          } else {
            callback(new Error(t("login.message.captchaCode.error")));
          }
        },
      },
    ],
  };
});

/**
 * 获取验证码
 */
function getCaptcha() {
  AuthAPI.getCaptcha().then((data) => {
    loginData.value.captchaKey = data.captchaKey;
    captchaBase64.value = data.captchaBase64;
  });
}
/**
 * 检查输入大小写
 */
function checkCapslock(event: KeyboardEvent) {
  // 防止浏览器密码自动填充时报错
  if (event instanceof KeyboardEvent) {
    isCapslock.value = event.getModifierState("CapsLock");
  }
}
/**
 * 登录
 */
const loginFormRef = ref();
function handleLogin() {
  loginFormRef.value
    .validate((valid: boolean) => {
      if (valid) {
        loading.value = true;
        userStore.login(loginData.value).then(() => {
          const query: LocationQuery = route.query;
          const redirect = (query.redirect as LocationQueryValue) ?? "/";
          const otherQueryParams = Object.keys(query).reduce(
            (acc: any, cur: string) => {
              if (cur !== "redirect") {
                acc[cur] = query[cur];
              }
              return acc;
            },
            {}
          );
          router.push({
            path: redirect,
            query: otherQueryParams,
          });
        });
      }
    })
    .catch(() => {
      getCaptcha();
    })
    .finally(() => {
      loading.value = false;
    });
}

const toggleTheme = () => {
  const newTheme =
    settingsStore.theme === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK;
  settingsStore.changeTheme(newTheme);
};

onMounted(() => {
  getCaptcha();
});
</script>

<style scoped lang="scss">
html.dark {
  .login-container {
    background: url("@/assets/images/login-bg-dark.jpg") no-repeat center right;
  }
}

.login-container {
  overflow-y: auto;
  background: url("@/assets/images/login-bg.jpg") no-repeat center right;

  @apply wh-full flex-center;
}

.el-form-item {
  background: var(--el-input-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 5px;
}

:deep(.el-input) {
  .el-input__wrapper {
    padding: 0;
    background-color: transparent;
    box-shadow: none;

    &.is-focus,
    &:hover {
      box-shadow: none !important;
    }

    input:-webkit-autofill {
      /* 通过延时渲染背景色变相去除背景颜色 */
      transition: background-color 1000s ease-in-out 0s;
    }
  }
}
</style>
