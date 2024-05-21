import { ref } from "vue";
import { store } from "@/store";
import { UserInfo } from "@/service/user/types";
import { LoginData } from "@/service/auth/types";
import { loginApi, logoutApi } from "@/service/auth";
import { getUserInfoApi } from "@/service/user";
import { resetRouter } from "@/router";
export const useUserStore = defineStore("user", () => {
  const user = ref<UserInfo>({
    roles: [],
    perms: [],
  });

  /**
   * 登录
   *
   * @param {LoginData}
   * @returns
   */
  function login(loginData: LoginData) {
    return new Promise<void>((resolve, reject) => {
      loginApi(loginData)
        .then((res) => {
          const { tokenType, accessToken } = res.data;
          localStorage.setItem("accessToken", tokenType + " " + accessToken);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * 获取信息(用户昵称、头像、角色集合、权限集合)
   */
  function getUserInfo() {
    return new Promise<UserInfo>((resolve, reject) => {
      getUserInfoApi()
        .then((res) => {
          const { data } = res;
          if (!data) {
            reject("Verification failed, please Login again.");
            return;
          }
          if (!data.roles || data.roles.length <= 0) {
            reject("getUserInfo: roles must be a non-null array!");
            return;
          }
          Object.assign(user.value, { ...data });
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * 退出登录
   */
  function logout() {
    return new Promise<void>((resolve, reject) => {
      logoutApi()
        .then(() => {
          localStorage.setItem("accessToken", "");
          location.reload(); // 清空路由
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * 重置token
   */
  function resetToken() {
    console.log("resetToken");
    return new Promise<void>((resolve) => {
      localStorage.setItem("accessToken", "");
      resetRouter();
      resolve();
    });
  }

  return {
    user,
    login,
    getUserInfo,
    logout,
    resetToken,
  };
});

export function useUserStoreHook() {
  return useUserStore(store);
}
