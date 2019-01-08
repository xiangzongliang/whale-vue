module.exports = {
    extends: [
      "plugin:vue/essential"
    ],
    root: true,     //不用再去父级目录中找校验文件了
    env: {
        browser: true,
        es6:true,   //启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            jsx: false
        }
    },
    //校验规则 off 0 | warn 1 | error 或 2

    rules: {
        'no-console':0,
    }
}