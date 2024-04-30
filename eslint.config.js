import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import vueESlintParser from "vue-eslint-parser";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  {
    languageOptions: {
      parser: vueESlintParser,
      parserOptions: {
        parser: tseslint.parser,
        sourceType: "module",
        ecmaVersion: "latest",
        ...tseslint.configs.recommended,
      },
    },
    plugins: {
      eslintPluginPrettier,
    },
    rules: {
      // https://eslint.vuejs.org/rules/#priority-a-essential-error-prevention
      "vue/multi-word-component-names": "off",
      "vue/no-v-model-argument": "off",
      "vue/script-setup-uses-vars": "error",
      "vue/no-reserved-component-names": "off",
      "vue/custom-event-name-casing": "off",
      "vue/attributes-order": "off",
      "vue/one-component-per-file": "off",
      "vue/html-closing-bracket-newline": "off",
      "vue/max-attributes-per-line": "off",
      "vue/multiline-html-element-content-newline": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/attribute-hyphenation": "off",
      "vue/require-default-prop": "off",
      "vue/require-explicit-emits": "off",
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always",
            normal: "never",
            component: "always",
          },
          svg: "always",
          math: "always",
        },
      ],
      "@typescript-eslint/no-empty-function": "off", // 关闭空方法检查
      "@typescript-eslint/no-explicit-any": "off", // 关闭any类型的警告
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/ban-ts-ignore": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": "off",
      // "@prettier/prettier": [
      //   "error",
      //   {
      //     useTabs: false, // 不使用制表符
      //   },
      // ],
    },
  },
  ...pluginVue.configs["flat/essential"],
];
