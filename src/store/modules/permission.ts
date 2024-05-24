import { RouteRecordRaw } from "vue-router";
import { RouteVO } from "@/service/menu/types";
import { store } from "@/store";
import { constantRoutes } from "@/router";
import MenuAPI from "@/service/menu";
const module = import.meta.glob("../../views/**/*.vue");
const Layout = () => import("@/layout/index.vue");
/**
 * Use meta.role to determine if the current user has permission
 *
 * @param roles 用户角色集合
 * @param route 路由
 * @returns
 */
const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    if (roles.includes("ROOT")) {
      return true;
    }
    return roles.some(
      (role) =>
        Array.isArray(route.meta?.roles) && route.meta?.roles.includes(role)
    );
  } else {
    return false;
  }
};

/**
 * 递归过滤有权限的动态路由
 *
 * @param routes 接口返回所有的动态路由
 * @param roles 用户角色集合
 * @returns 返回用户有权限的动态路由
 */
const filterAsyncRoutes = (routes: RouteVO[], roles: string[]) => {
  const asyncRoutes: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    const tmpRoute = { ...route } as RouteRecordRaw;
    if (hasPermission(roles, tmpRoute)) {
      // 如果是顶级目录，替换为 Layout 组件
      if (tmpRoute.component?.toString() === "Layout") {
        tmpRoute.component = Layout;
      } else {
        //如果是子目录，动态加载组件
        const component = module[`../../views/${tmpRoute.component}.vue`];
        if (component) {
          tmpRoute.component = component;
        } else {
          tmpRoute.component = module["../../views/error-page/404.vue"];
        }
      }
      if (tmpRoute.children) {
        tmpRoute.children = filterAsyncRoutes(route.children, roles);
      }
      asyncRoutes.push(tmpRoute);
    }
  });
  return asyncRoutes;
};
export const usePermissionStore = defineStore("permission", () => {
  const routes = ref<RouteRecordRaw[]>([]);
  const setRoutes = (newRoutes: RouteRecordRaw[]) => {
    routes.value = constantRoutes.concat(newRoutes);
  };
  /**
   * 生成动态路由
   *
   * @param roles 用户角色集合
   * @returns
   */
  function generateRoutes(roles: string[]) {
    return new Promise<RouteRecordRaw[]>((resolve, reject) => {
      MenuAPI.getRoutes()
        .then((data) => {
          console.log("data", data);
          const accessedRoutes = filterAsyncRoutes(data, roles);

          setRoutes(accessedRoutes);
          resolve(accessedRoutes);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * 获取与激活的顶部菜单项相关的混合模式左侧菜单集合
   */
  const mixLeftMenus = ref<RouteRecordRaw[]>([]);
  function setMixLeftMenus(topMenuPath: string) {
    const matchedItem = routes.value.find((item) => item.path === topMenuPath);
    if (matchedItem && matchedItem.children) {
      mixLeftMenus.value = matchedItem.children;
    }
  }

  return {
    routes,
    setRoutes,
    generateRoutes,
    mixLeftMenus,
    setMixLeftMenus,
  };
});

export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
