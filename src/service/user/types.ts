/**
 * 用户信息
 */

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
