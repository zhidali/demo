// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
      // parser: 'babel-eslint'
    },
    env: {
      browser: false,
    },
    extends: [
      // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
      // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
      'plugin:vue/essential',
      // https://github.com/standard/standard/blob/master/docs/RULES-en.md
      'eslint:recommended'
    ],
    // required to lint *.vue files
    plugins: [
      'vue'
    ],
    // add your custom rules here
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'off',
      'semi': ['error', 'always'], // 强制分号
      // 缩进
      // 'vue/script-indent': ['error', 4, {'baseIndent': 1}], 
      'keyword-spacing': ['error', {'before':true,'after':true}],
      'no-useless-escape': 0,
      'no-undef': 0,
      'no-unused-vars': 0,
      'space-before-function-paren': 0
      // 函函数名或 function 关键字与左括号之间允许有空白
      // 'space-before-function-paren': ['error',{'anonymous': 'always', 'named': 'never', 'asyncArrow': 'always'}] 
    }
  }
  