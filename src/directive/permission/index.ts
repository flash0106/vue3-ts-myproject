import { hasAuth } from "@/plugins";
import { Directive, DirectiveBinding } from "vue";

/**
 * 按钮权限
 */

export const hasPerm: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value: requiredPerms } = binding;
    if (requiredPerms) {
      if (!hasAuth(requiredPerms)) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(
        "v-hasPerm must have a value.Like v-hasPerm=\"['sys:user:add','sys:user:edit']\""
      );
    }
  },
};
