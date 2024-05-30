import request from "../baseDao";
import { MenuQuery, MenuVO, RouteVO, MenuForm } from "./types";

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

  /**
   * 获取菜单下拉选项
   */
  static getOptions() {
    return request<any, OptionType[]>({
      url: "/api/v1/menus/options",
      method: "get",
    });
  }
  /**
   * 获取菜单表单数据
   *  @param id
   */
  static getFormData(id: number) {
    return request<any, MenuForm>({
      url: "/api/v1/menus/" + id + "/form",
      method: "get",
    });
  }

  /**
   * 添加菜单
   */
  static add(data: MenuForm) {
    return request({
      url: "/api/v1/menus",
      method: "post",
      data: data,
    });
  }
  /**
   * 修改菜单
   */
  static update(id: string, data: MenuForm) {
    return request({
      url: "/api/v1/menus/" + id,
      method: "put",
      data: data,
    });
  }
  /**
   * 删除菜单
   */
  static deleteById(id: number) {
    return request({
      url: "/api/v1/menus/" + id,
      method: "delete",
    });
  }
}

export default MenuAPI;
