import { MenuTypeEnum } from "@/enums/MenuTypeEnum";

/**
 * 菜单查询参数类型
 */
export interface MenuQuery {
  keywords?: string;
}

/**
 * 菜单视图对象类型
 */
export interface MenuVO {
  // 子菜单
  children?: MenuVO[];
  //组件路径
  component?: string;
  //图标
  icon?: string;
  //菜单id
  id: number;
  //父菜单id
  parentId?: number;
  //按钮权限标志
  perm?: string;
  //跳转路径
  redirect?: string;
  //路由名称
  routeName?: string;
  //路由相对路径
  routePath?: string;
  //菜单排序
  sort?: number;
  //菜单类型
  type: MenuTypeEnum;
  //菜单是否可见(1:可见;0:不可见)
  visible?: 1 | 0;
}

/**
 * RouteVO，路由对象
 */
export interface RouteVO {
  /**
   * 子路由列表
   */
  children: RouteVO[];
  /**
   * 组件路径
   */
  component?: string;
  meta?: Meta;
  /**
   * 路由名称
   */
  name?: string;
  /**
   * 路由路径
   */
  path?: string;
  /**
   * 跳转链接
   */
  redirect?: string;
}

export interface Meta {
  /**
   * 【目录】只有一个子路由是否始终显示
   */
  alwaysShow?: boolean;
  /**
   * 是否隐藏(true-是 false-否)
   */
  hidden?: boolean;
  /**
   * ICON
   */
  icon?: string;
  /**
   * 【菜单】是否开启页面缓存
   */
  keepAlive?: boolean;
  /**
   * 拥有路由权限的角色编码
   */
  roles?: string[];
  /**
   * 路由title
   */
  title?: string;
}
