/**
 * 用户信息
 */

import { number } from "echarts/core";

export interface UserInfo {
  userId?: number;
  username?: string;
  nickname?: string;
  avatar?: string;
  roles: string[];
  perms: string[]; //权限
}

/**
 * 用户查询对象类型
 */
export interface UserQuery extends PageQuery {
  keywords?: string;
  status?: number;
  deptId?: number;
  startTime?: string | number;
  endTime?: string | number;
}

/**
 * 用户分页对象
 */
export interface UserPageVO {
  avatar?: string;
  createTime?: string;
  deptName?: string;
  email?: string;
  genderLabel?: string;
  id?: number;
  mobile?: number;
  nickname?: string;
  roleNames?: string;
  status?: number;
  username?: string;
}

/**
 * 用户表单类型
 */
export interface UserForm {
  avatar?: string;
  deptId?: number;
  email?: string;
  gender?: number;
  id?: number;
  mobile?: number;
  nickname?: string;
  roleIds?: number[];
  status?: number;
  username?: string;
}
