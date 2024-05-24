import request from "../baseDao";
import { MenuQuery, MenuVO, RouteVO } from "./types";

class MenuAPI {
  /**
   * 获取路由列表
   */
  static getRoutes() {
    return request<RouteVO[], any>({
      url: "/api/v1/menus/routes",
      method: "get",
    });
  }

  /**
   * 获取菜单树形列表
   *
   * @param queryParams
   */
  static getList(queryParams: MenuQuery) {
    return request<any, MenuVO[]>({
      url: "/api/v1/menus",
      method: "get",
      params: queryParams,
    });
  }
}

export default MenuAPI;
