import { defineMock } from "./base";

export default defineMock([
  {
    url: "menus/routes",
    method: ["GET"],
    body: {
      code: "00000",
      data: [
        {
          path: "/system",
          component: "Layout",
          redirect: "/system/user",
          name: "/system",
          meta: {
            title: "系统管理",
            icon: "system",
            hidden: false,
            roles: ["ADMIN"],
          },
          children: [
            {
              path: "user",
              component: "system/user/index",
              name: "User",
              meta: {
                title: "用户管理",
                icon: "user",
                hidden: false,
                roles: ["ADMIN"],
                keepAlive: true,
              },
            },
            {
              path: "role",
              component: "system/role/index",
              name: "Role",
              meta: {
                title: "角色管理",
                icon: "role",
                hidden: false,
                roles: ["ADMIN"],
                keepAlive: true,
              },
            },
            {
              path: "menu",
              component: "system/menu/index",
              name: "Menu",
              meta: {
                title: "菜单管理",
                icon: "menu",
                hidden: false,
                roles: ["ADMIN"],
                keepAlive: true,
              },
            },
          ],
        },
        {
          path: "/multi-level",
          component: "Layout",
          redirect: "/multi-level/multi-level1",
          name: "/multiLevel",
          meta: {
            title: "多级菜单",
            icon: "cascader",
            hidden: false,
            roles: ["ADMIN"],
          },
          children: [
            {
              path: "multi-level1",
              component: "demo/multi-level/level1",
              redirect: "/multi-level/multi-level2",
              name: "MultiLevel1",
              meta: {
                title: "菜单一级",
                icon: "",
                hidden: false,
                roles: ["ADMIN"],
                keepAlive: true,
              },
              children: [
                {
                  path: "multi-level2",
                  component: "demo/multi-level/children/level2",
                  redirect: "/multi-level/multi-level2/multi-level3-1",
                  name: "MultiLevel2",
                  meta: {
                    title: "菜单二级",
                    icon: "",
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true,
                  },
                  children: [
                    {
                      path: "multi-level3-1",
                      component: "demo/multi-level/children/children/level3-1",
                      name: "MultiLevel31",
                      meta: {
                        title: "菜单三级-1",
                        icon: "",
                        hidden: false,
                        roles: ["ADMIN"],
                        keepAlive: true,
                      },
                    },
                    {
                      path: "multi-level3-2",
                      component: "demo/multi-level/children/children/level3-2",
                      name: "MultiLevel32",
                      meta: {
                        title: "菜单三级-2",
                        icon: "",
                        hidden: false,
                        roles: ["ADMIN"],
                        keepAlive: true,
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          path: "/practice",
          component: "Layout",
          name: "/practice",
          meta: {
            title: "前端实践",
            icon: "menu",
            hidden: false,
            roles: ["ADMIN"],
          },
          children: [
            {
              path: "wang-editor",
              component: "demo/wang-editor",
              name: "WangEditor",
              meta: {
                title: "富文本编辑器",
                icon: "",
                hidden: false,
                roles: ["ADMIN"],
                keepAlive: true,
              },
            },
            {
              path: "upload",
              component: "demo/upload/index",
              name: "Upload",
              meta: {
                title: "大文件上传",
                icon: "",
                hidden: false,
                roles: ["ADMIN"],
                keepAlive: true,
              },
            },
            {
              path: "img-lazy-load",
              component: "demo/img-lazy-load/index",
              name: "ImgLazyLoadDemo",
              meta: {
                title: "图片懒加载",
                icon: "",
                hidden: false,
                roles: ["ADMIN"],
                keepAlive: true,
              },
            },
            {
              path: "virtual-scroll",
              component: "demo/virtual-scroll/index",
              name: "VertualScrollDemo",
              meta: {
                title: "虚拟滚动",
                icon: "",
                hidden: false,
                roles: ["ADMIN"],
                keepAlive: true,
              },
            },
            // {
            //   path: "signature",
            //   component: "demo/signature",
            //   name: "Signature",
            //   meta: {
            //     title: "签名",
            //     icon: "",
            //     hidden: false,
            //     roles: ["ADMIN"],
            //     keepAlive: true,
            //   },
            // },
            // {
            //   path: "table",
            //   component: "demo/table",
            //   name: "Table",
            //   meta: {
            //     title: "表格",
            //     icon: "",
            //     hidden: false,
            //     roles: ["ADMIN"],
            //     keepAlive: true,
            //   },
            // },
          ],
        },
      ],
      msg: "一切ok",
    },
  },

  {
    url: "menus",
    method: ["GET"],
    body: {
      code: "00000",
      data: [
        {
          id: 1,
          parentId: 0,
          name: "系统管理",
          type: "CATALOG",
          path: "/system",
          component: "Layout",
          sort: 1,
          visible: 1,
          icon: "system",
          redirect: "/system/user",
          perm: null,
          children: [
            {
              id: 2,
              parentId: 1,
              name: "用户管理",
              type: "MENU",
              path: "user",
              component: "system/user/index",
              sort: 1,
              visible: 1,
              icon: "user",
              redirect: null,
              perm: null,
              children: [
                {
                  id: 31,
                  parentId: 2,
                  name: "用户新增",
                  type: "BUTTON",
                  path: "",
                  component: null,
                  sort: 1,
                  visible: 1,
                  icon: "",
                  redirect: "",
                  perm: "sys:user:add",
                  children: [],
                },
                {
                  id: 32,
                  parentId: 2,
                  name: "用户编辑",
                  type: "BUTTON",
                  path: "",
                  component: null,
                  sort: 2,
                  visible: 1,
                  icon: "",
                  redirect: "",
                  perm: "sys:user:edit",
                  children: [],
                },
                {
                  id: 33,
                  parentId: 2,
                  name: "用户删除",
                  type: "BUTTON",
                  path: "",
                  component: null,
                  sort: 3,
                  visible: 1,
                  icon: "",
                  redirect: "",
                  perm: "sys:user:delete",
                  children: [],
                },
                {
                  id: 88,
                  parentId: 2,
                  name: "重置密码",
                  type: "BUTTON",
                  path: "",
                  component: null,
                  sort: 4,
                  visible: 1,
                  icon: "",
                  redirect: null,
                  perm: "sys:user:password:reset",
                  children: [],
                },
              ],
            },
            {
              id: 3,
              parentId: 1,
              name: "角色管理",
              type: "MENU",
              path: "role",
              component: "system/role/index",
              sort: 2,
              visible: 1,
              icon: "role",
              redirect: null,
              perm: null,
              children: [
                {
                  id: 70,
                  parentId: 3,
                  name: "角色新增",
                  type: "BUTTON",
                  path: "",
                  component: null,
                  sort: 1,
                  visible: 1,
                  icon: "",
                  redirect: null,
                  perm: "sys:role:add",
                  children: [],
                },
                {
                  id: 71,
                  parentId: 3,
                  name: "角色编辑",
                  type: "BUTTON",
                  path: "",
                  component: null,
                  sort: 2,
                  visible: 1,
                  icon: "",
                  redirect: null,
                  perm: "sys:role:edit",
                  children: [],
                },
                {
                  id: 72,
                  parentId: 3,
                  name: "角色删除",
                  type: "BUTTON",
                  path: "",
                  component: null,
                  sort: 3,
                  visible: 1,
                  icon: "",
                  redirect: null,
                  perm: "sys:role:delete",
                  children: [],
                },
              ],
            },
            {
              id: 4,
              parentId: 1,
              name: "菜单管理",
              type: "MENU",
              path: "menu",
              component: "system/menu/index",
              sort: 3,
              visible: 1,
              icon: "menu",
              redirect: null,
              perm: null,
              children: [
                {
                  id: 73,
                  parentId: 4,
                  name: "菜单新增",
                  type: "BUTTON",
                  path: "",
                  component: null,
                  sort: 1,
                  visible: 1,
                  icon: "",
                  redirect: null,
                  perm: "sys:menu:add",
                  children: [],
                },
                {
                  id: 74,
                  parentId: 4,
                  name: "菜单编辑",
                  type: "BUTTON",
                  path: "",
                  component: null,
                  sort: 3,
                  visible: 1,
                  icon: "",
                  redirect: null,
                  perm: "sys:menu:edit",
                  children: [],
                },
                {
                  id: 75,
                  parentId: 4,
                  name: "菜单删除",
                  type: "BUTTON",
                  path: "",
                  component: null,
                  sort: 3,
                  visible: 1,
                  icon: "",
                  redirect: null,
                  perm: "sys:menu:delete",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 20,
          parentId: 0,
          name: "多级菜单",
          type: "CATALOG",
          path: "/multi-level",
          component: "Layout",
          sort: 9,
          visible: 1,
          icon: "cascader",
          redirect: "/multi-level/multi-level1",
          perm: null,
          children: [
            {
              id: 21,
              parentId: 20,
              name: "菜单一级",
              type: "MENU",
              path: "multi-level1",
              component: "demo/multi-level/level1",
              sort: 1,
              visible: 1,
              icon: "",
              redirect: "/multi-level/multi-level2",
              perm: null,
              children: [
                {
                  id: 22,
                  parentId: 21,
                  name: "菜单二级",
                  type: "MENU",
                  path: "multi-level2",
                  component: "demo/multi-level/children/level2",
                  sort: 1,
                  visible: 1,
                  icon: "",
                  redirect: "/multi-level/multi-level2/multi-level3-1",
                  perm: null,
                  children: [
                    {
                      id: 23,
                      parentId: 22,
                      name: "菜单三级-1",
                      type: "MENU",
                      path: "multi-level3-1",
                      component: "demo/multi-level/children/children/level3-1",
                      sort: 1,
                      visible: 1,
                      icon: "",
                      redirect: "",
                      perm: null,
                      children: [],
                    },
                    {
                      id: 24,
                      parentId: 22,
                      name: "菜单三级-2",
                      type: "MENU",
                      path: "multi-level3-2",
                      component: "demo/multi-level/children/children/level3-2",
                      sort: 2,
                      visible: 1,
                      icon: "",
                      redirect: "",
                      perm: null,
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 36,
          parentId: 0,
          name: "前端实践",
          type: "CATALOG",
          path: "/component",
          component: "Layout",
          sort: 10,
          visible: 1,
          icon: "menu",
          redirect: "",
          perm: null,
          children: [
            {
              id: 37,
              parentId: 36,
              name: "富文本编辑器",
              type: "MENU",
              path: "wang-editor",
              component: "demo/wang-editor",
              sort: 1,
              visible: 1,
              icon: "",
              redirect: "",
              perm: null,
              children: [],
            },
            {
              id: 38,
              parentId: 36,
              name: "大文件上传",
              type: "MENU",
              path: "upload",
              component: "demo/upload",
              sort: 2,
              visible: 1,
              icon: "",
              redirect: "",
              perm: null,
              children: [],
            },
            {
              id: 39,
              parentId: 36,
              name: "图片懒加载",
              type: "MENU",
              path: "img-lazy-load",
              component: "demo/img-lazy-load",
              sort: 3,
              visible: 1,
              icon: "",
              redirect: "",
              perm: null,
              children: [],
            },
            {
              id: 95,
              parentId: 36,
              name: "字典组件",
              type: "MENU",
              path: "dict-demo",
              component: "demo/dict",
              sort: 4,
              visible: 1,
              icon: "",
              redirect: "",
              perm: null,
              children: [],
            },
            {
              id: 93,
              parentId: 36,
              name: "签名",
              type: "MENU",
              path: "signature",
              component: "demo/signature",
              sort: 6,
              visible: 1,
              icon: "",
              redirect: "",
              perm: null,
              children: [],
            },
            {
              id: 94,
              parentId: 36,
              name: "表格",
              type: "MENU",
              path: "table",
              component: "demo/table",
              sort: 7,
              visible: 1,
              icon: "",
              redirect: "",
              perm: null,
              children: [],
            },
          ],
        },
      ],
      msg: "一切ok",
    },
  },

  {
    url: "menus/options",
    method: ["GET"],
    body: {
      code: "00000",
      data: [
        {
          value: 1,
          label: "系统管理",
          children: [
            {
              value: 2,
              label: "用户管理",
              children: [
                {
                  value: 31,
                  label: "用户新增",
                },
                {
                  value: 32,
                  label: "用户编辑",
                },
                {
                  value: 33,
                  label: "用户删除",
                },
                {
                  value: 88,
                  label: "重置密码",
                },
              ],
            },
            {
              value: 3,
              label: "角色管理",
              children: [
                {
                  value: 70,
                  label: "角色新增",
                },
                {
                  value: 71,
                  label: "角色编辑",
                },
                {
                  value: 72,
                  label: "角色删除",
                },
              ],
            },
            {
              value: 4,
              label: "菜单管理",
              children: [
                {
                  value: 73,
                  label: "菜单新增",
                },
                {
                  value: 74,
                  label: "菜单编辑",
                },
                {
                  value: 75,
                  label: "菜单删除",
                },
              ],
            },
            // {
            //   value: 5,
            //   label: "部门管理",
            //   children: [
            //     {
            //       value: 76,
            //       label: "部门新增",
            //     },
            //     {
            //       value: 77,
            //       label: "部门编辑",
            //     },
            //     {
            //       value: 78,
            //       label: "部门删除",
            //     },
            //   ],
            // },
            // {
            //   value: 6,
            //   label: "字典管理",
            //   children: [
            //     {
            //       value: 79,
            //       label: "字典类型新增",
            //     },
            //     {
            //       value: 81,
            //       label: "字典类型编辑",
            //     },
            //     {
            //       value: 84,
            //       label: "字典类型删除",
            //     },
            //     {
            //       value: 85,
            //       label: "字典数据新增",
            //     },
            //     {
            //       value: 86,
            //       label: "字典数据编辑",
            //     },
            //     {
            //       value: 87,
            //       label: "字典数据删除",
            //     },
            //   ],
            // },
          ],
        },
        {
          value: 20,
          label: "多级菜单",
          children: [
            {
              value: 21,
              label: "菜单一级",
              children: [
                {
                  value: 22,
                  label: "菜单二级",
                  children: [
                    {
                      value: 23,
                      label: "菜单三级-1",
                    },
                    {
                      value: 24,
                      label: "菜单三级-2",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          value: 36,
          label: "组件封装",
          children: [
            {
              value: 37,
              label: "富文本编辑器",
            },
            {
              value: 38,
              label: "图片上传",
            },
            {
              value: 39,
              label: "图标选择器",
            },
            {
              value: 95,
              label: "字典组件",
            },
            {
              value: 93,
              label: "签名",
            },
            {
              value: 94,
              label: "表格",
            },
          ],
        },
      ],
      msg: "一切ok",
    },
  },

  // 新增菜单
  {
    url: "menus",
    method: ["POST"],
    body({ body }) {
      return {
        code: "00000",
        data: null,
        msg: "新增菜单" + body.name + "成功",
      };
    },
  },

  // 获取菜单表单数据
  {
    url: "menus/:id/form",
    method: ["GET"],
    body: ({ params }) => {
      return {
        code: "00000",
        data: menuMap[params.id],
        msg: "一切ok",
      };
    },
  },

  // 修改菜单
  {
    url: "menus/:id",
    method: ["PUT"],
    body({ body }) {
      return {
        code: "00000",
        data: null,
        msg: "修改菜单" + body.name + "成功",
      };
    },
  },

  // 删除菜单
  {
    url: "menus/:id",
    method: ["DELETE"],
    body({ params }) {
      return {
        code: "00000",
        data: null,
        msg: "删除菜单" + params.id + "成功",
      };
    },
  },
]);

// 菜单映射表数据
const menuMap: Record<string, any> = {
  1: {
    id: 1,
    parentId: 0,
    name: "系统管理",
    type: "CATALOG",
    path: "/system",
    component: "Layout",
    perm: null,
    visible: 1,
    sort: 1,
    icon: "system",
    redirect: "/system/user",
    keepAlive: null,
    alwaysShow: null,
  },
  2: {
    id: 2,
    parentId: 1,
    name: "用户管理",
    type: "MENU",
    path: "user",
    component: "system/user/index",
    perm: null,
    visible: 1,
    sort: 1,
    icon: "user",
    redirect: null,
    keepAlive: 1,
    alwaysShow: null,
  },
  3: {
    id: 3,
    parentId: 1,
    name: "角色管理",
    type: "MENU",
    path: "role",
    component: "system/role/index",
    perm: null,
    visible: 1,
    sort: 2,
    icon: "role",
    redirect: null,
    keepAlive: 1,
    alwaysShow: null,
  },
  4: {
    id: 4,
    parentId: 1,
    name: "菜单管理",
    type: "MENU",
    path: "menu",
    component: "system/menu/index",
    perm: null,
    visible: 1,
    sort: 3,
    icon: "menu",
    redirect: null,
    keepAlive: 1,
    alwaysShow: null,
  },
  5: {
    id: 5,
    parentId: 1,
    name: "部门管理",
    type: "MENU",
    path: "dept",
    component: "system/dept/index",
    perm: null,
    visible: 1,
    sort: 4,
    icon: "tree",
    redirect: null,
    keepAlive: 1,
    alwaysShow: null,
  },
  6: {
    id: 6,
    parentId: 1,
    name: "字典管理",
    type: "MENU",
    path: "dict",
    component: "system/dict/index",
    perm: null,
    visible: 1,
    sort: 5,
    icon: "dict",
    redirect: null,
    keepAlive: 1,
    alwaysShow: null,
  },
};
