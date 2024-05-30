<template>
  <div class="user-manage-page page-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="关键字" prop="keywords">
          <el-input
            v-model="queryParams.keywords"
            placeholder="用户名/昵称/手机号"
            clearable
            style="width: 200px"
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
            v-model="queryParams.status"
            placeholder="全部"
            clearable
            class="!w-[100px]"
          >
            <el-option label="启用" value="1" />
            <el-option label="禁用" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            class="!w-[240px]"
            v-model="dateTimeRange"
            type="daterange"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="截止时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery"
            ><i-ep-search />搜索</el-button
          >
          <el-button @click="resetQuery">
            <i-ep-refresh />
            重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-card shadow="never" class="table-container">
      <template #header>
        <el-button
          v-hasPerm="['sys:user:add']"
          type="success"
          @click="openDialog('user-form')"
          ><i-ep-plus />新增</el-button
        >
        <el-button
          v-hasPerm="['sys:user:delete']"
          type="danger"
          :disabled="removeIds.length === 0"
          @click="handleDelete()"
          ><i-ep-delete />删除</el-button
        >
      </template>
      <el-table
        v-loading="loading"
        :data="pageData"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column
          key="id"
          label="编号"
          align="center"
          prop="id"
          width="100"
        />
        <el-table-column
          key="username"
          label="用户名"
          align="center"
          prop="username"
        />
        <el-table-column
          label="用户昵称"
          width="120"
          align="center"
          prop="nickname"
        />

        <el-table-column
          label="性别"
          width="100"
          align="center"
          prop="genderLabel"
        />

        <el-table-column
          label="部门"
          width="120"
          align="center"
          prop="deptName"
        />
        <el-table-column
          label="手机号码"
          align="center"
          prop="mobile"
          width="120"
        />

        <el-table-column label="状态" align="center" prop="status">
          <template #default="scope">
            <el-tag :type="scope.row.status == 1 ? 'success' : 'info'">{{
              scope.row.status == 1 ? "启用" : "禁用"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          width="180"
        />
        <el-table-column label="操作" fixed="right" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['sys:user:password:reset']"
              type="primary"
              size="small"
              link
              @click="resetPassword(scope.row)"
              ><i-ep-refresh-left />重置密码</el-button
            >
            <el-button
              v-hasPerm="['sys:user:edit']"
              type="primary"
              link
              size="small"
              @click="openDialog('user-form', scope.row.id)"
              ><i-ep-edit />编辑</el-button
            >
            <el-button
              v-hasPerm="['sys:user:delete']"
              type="primary"
              link
              size="small"
              @click="handleDelete(scope.row.id)"
              ><i-ep-delete />删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-if="total > 0"
        v-model:total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="handleQuery"
      />
    </el-card>
    <el-dialog
      v-model="dialog.visible"
      :title="dialog.title"
      :width="dialog.width"
      append-to-body
      @close="closeDialog"
    >
      <el-form
        ref="userFormRef"
        :model="formData"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" :readonly="!!formData.id" />
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="formData.nickname" placeholder="请输入用户昵称" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="formData.gender" placeholder="请选择性别">
            <el-option
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用户角色" prop="roleIds">
          <el-select v-model="formData.roleIds" multiple placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input
            v-model="formData.mobile"
            placeholder="请输入手机号码"
            maxlength="11"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="formData.email"
            placeholder="请输入邮箱"
            maxlength="50"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "User",
  inheritAttrs: false,
});
import { UserQuery, UserPageVO, UserForm } from "@/service/user/types";
import UserAPI from "@/service/user";
import RoleAPI from "@/service/role";
const queryFormRef = ref(ElForm);
const queryParams = reactive<UserQuery>({
  pageNum: 1,
  pageSize: 10,
});
const total = ref(0);
const dateTimeRange = ref<string | number[]>([]);
watch(dateTimeRange, (newVal) => {
  if (newVal) {
    queryParams.startTime = newVal[0];
    queryParams.endTime = newVal[1];
  }
});
const loading = ref(false);
const pageData = ref<UserPageVO[]>([]);
function handleQuery() {
  loading.value = true;
  UserAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}
function resetQuery() {
  queryFormRef.value.resetFields();
  dateTimeRange.value = "";
  queryParams.pageNum = 1;
  queryParams.deptId = undefined;
  queryParams.startTime = undefined;
  queryParams.endTime = undefined;
  handleQuery();
}

const removeIds = ref([]);
function handleSelectionChange(val: any) {
  removeIds.value = val.map((item: any) => item.id);
}
function handleDelete(id?: number) {
  const userIds = [id || removeIds.value].join(",");
  if (!userIds) {
    ElMessage.warning("请勾选删除项");
    return;
  }
  ElMessageBox.confirm("确认删除用户?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(function () {
    UserAPI.deleteByIds(userIds).then(() => {
      ElMessage.success("删除成功");
      resetQuery();
    });
  });
}

function resetPassword(row: { [key: string]: any }) {
  ElMessageBox.prompt(
    "请输入用户「" + row.username + "」的新密码",
    "重置密码",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
    }
  ).then(({ value }) => {
    if (!value || value.length < 6) {
      // 检查密码是否为空或少于6位
      ElMessage.warning("密码至少需要6位字符，请重新输入");
      return false;
    }
    UserAPI.updatePassword(row.id, value).then(() => {
      ElMessage.success("密码重置成功，新密码是：" + value);
    });
  });
}

// 校验规则
const rules = reactive({
  username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  nickname: [{ required: true, message: "用户昵称不能为空", trigger: "blur" }],
  deptId: [{ required: true, message: "所属部门不能为空", trigger: "blur" }],
  roleIds: [{ required: true, message: "用户角色不能为空", trigger: "blur" }],
  email: [
    {
      pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
      message: "请输入正确的邮箱地址",
      trigger: "blur",
    },
  ],
  mobile: [
    {
      pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
      message: "请输入正确的手机号码",
      trigger: "blur",
    },
  ],
});

// 弹窗对象
const dialog = reactive({
  visible: false,
  type: "user-form",
  width: 800,
  title: "",
});
const userFormRef = ref(ElForm);
// 用户表单数据
const formData = reactive<UserForm>({
  status: 1,
});

const genderOptions = [
  {
    label: "男",
    value: 1,
  },
  {
    label: "女",
    value: 2,
  },
];

/**
 * 打开弹窗
 *
 * @param type 弹窗类型  用户表单：user-form | 用户导入：user-import
 * @param id 用户ID
 */
async function openDialog(type: string, id?: number) {
  if (type === "user-form") {
    // 用户表单弹窗
    await loadRoleOptions();
    if (id) {
      dialog.title = "修改用户";
      UserAPI.getFormData(id).then((data) => {
        Object.assign(formData, { ...data });
      });
    } else {
      dialog.title = "新增用户";
    }
  }
  dialog.visible = true;
}
function closeDialog() {
  dialog.visible = false;
  if (dialog.type === "user-form") {
    userFormRef.value.resetFields();
    userFormRef.value.clearValidate();

    formData.id = undefined;
    formData.status = 1;
  }
}

const roleList = ref<OptionType[]>([]);
/** 加载角色下拉数据源 */
async function loadRoleOptions() {
  RoleAPI.getOptions().then((data) => {
    roleList.value = data;
  });
}

function handleSubmit() {
  userFormRef.value.validate((valid: boolean) => {
    if (valid) {
      if (formData.id) {
        UserAPI.update(formData.id, formData).then(() => {
          ElMessage.success("修改用户成功");
          closeDialog();
          resetQuery();
        });
      } else {
        UserAPI.add(formData).then(() => {
          ElMessage.success("新增用户成功");
          closeDialog();
          resetQuery();
        });
      }
    }
  });
}

onMounted(() => {
  handleQuery();
});
</script>

<style scoped lang="scss"></style>
