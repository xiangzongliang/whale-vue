module.exports = {
    root: true,     //不用再去父级目录中找校验文件了
    env: {
        "browser": true,
        "es6": true,
        //"node":true
    },
    extends: [
        // "eslint:recommended"
        // 官方配置文档 https://eslint.vuejs.org/rules/
        //"plugin:vue/base"     // Enabling Correct ESLint Parsing  按照基本的eslint解析
        //"plugin:vue/strongly-recommended"  //Strongly Recommended (Improving Readability) 官方推荐
        "plugin:vue/essential"  //Error Prevention 基本的错误防范
    ],
    plugins: [
        //"html"
        "vue"
    ],
    parserOptions: {
        "ecmaVersion": 6,
        "sourceType": "module",
        "parser": "babel-eslint",
    },
    rules:{	
        "indent": [1,'tab'|4], //使用什么换行
        'no-dupe-args': 2, //函数定义的时候不允许出现重复的参数
        'no-dupe-keys': 2, //对象中不允许出现重复的键
        'no-duplicate-case': 2, //switch语句中不允许出现重复的case标签
        'no-empty': 2, //不允许出现空的代码块
        'no-negated-in-lhs': 2, //不允许在in表达式语句中对最左边的运算数使用取反操作
        'no-unreachable': 2, //在return，throw，continue，break语句后不允许出现不可能到达的语句
        'use-isnan': 2, //要求检查NaN的时候使用isNaN()
        'default-case': 0, //在switch语句中需要有default语句
        'no-eval': 2, //不允许使用eval()
        'no-loop-func': 2, //不允许在循环语句中进行函数声明
        'no-redeclare': 2, //不允许变量重复声明
        'no-self-compare': 2, //不允许自己和自己比较
        'no-shadow-restricted-names': 2, //js关键字和保留字不能作为函数名或者变量名
        'generator-star-spacing': [2, "both"], //生成器函数前后空格
        'vue/no-use-v-if-with-v-for':1,
    }
    // "rules": {
    //     "accessor-pairs": "error",
    //     "array-bracket-newline": "off",
    //     "array-bracket-spacing": "off",
    //     "array-callback-return": "off",
    //     "array-element-newline": "off",
    //     "arrow-body-style": "off",
    //     "arrow-parens": "off",
    //     "arrow-spacing": "off",
    //     "block-scoped-var": "off",
    //     "block-spacing": [
    //         "error",
    //         "never"
    //     ],
    //     "brace-style": "off",
    //     "callback-return": "error",
    //     "camelcase": "off",
    //     "capitalized-comments": "off",
    //     "class-methods-use-this": "error",
    //     "comma-dangle": "off",
    //     "comma-spacing": "off",
    //     "comma-style": [
    //         "error",
    //         "last"
    //     ],
    //     "complexity": "off",
    //     "computed-property-spacing": [
    //         "error",
    //         "never"
    //     ],
    //     "consistent-return": "off",
    //     "consistent-this": "off",
    //     "curly": "off",
    //     "default-case": "off",
    //     "dot-location": "error",
    //     "dot-notation": "off",
    //     "eol-last": "off",
    //     "eqeqeq": "off",
    //     "func-call-spacing": "error",
    //     "func-name-matching": "off",
    //     "func-names": "off",
    //     "func-style": "off",
    //     "function-paren-newline": "off",
    //     "generator-star-spacing": "error",
    //     "global-require": "error",
    //     "guard-for-in": "off",
    //     "handle-callback-err": "error",
    //     "id-blacklist": "error",
    //     "id-length": "off",
    //     "id-match": "error",
    //     "implicit-arrow-linebreak": [
    //         "error",
    //         "beside"
    //     ],
    //     "indent": "off",
    //     "indent-legacy": "off",
    //     "init-declarations": "off",
    //     "jsx-quotes": "error",
    //     "key-spacing": "off",
    //     "keyword-spacing": "off",
    //     "line-comment-position": "off",
    //     "linebreak-style": [
    //         "error",
    //         "unix"
    //     ],
    //     "lines-around-comment": "off",
    //     "lines-around-directive": "off",
    //     "lines-between-class-members": "error",
    //     "max-classes-per-file": "error",
    //     "max-depth": "off",
    //     "max-len": "off",
    //     "max-lines": "error",
    //     "max-lines-per-function": "off",
    //     "max-nested-callbacks": "error",
    //     "max-params": "off",
    //     "max-statements": "off",
    //     "max-statements-per-line": "off",
    //     "multiline-comment-style": "off",
    //     "new-parens": "off",
    //     "newline-after-var": "off",
    //     "newline-before-return": "off",
    //     "newline-per-chained-call": "error",
    //     "no-alert": "error",
    //     "no-array-constructor": "error",
    //     "no-async-promise-executor": "error",
    //     "no-await-in-loop": "error",
    //     "no-bitwise": "off",
    //     "no-buffer-constructor": "error",
    //     "no-caller": "error",
    //     "no-catch-shadow": "off",
    //     "no-confusing-arrow": "error",
    //     "no-continue": "off",
    //     "no-console ":"error",
    //     "no-div-regex": "error",
    //     "no-duplicate-imports": "error",
    //     "no-else-return": "off",
    //     "no-empty": [
    //         "error",
    //         {
    //             "allowEmptyCatch": true
    //         }
    //     ],
    //     "no-empty-function": "off",
    //     "no-eq-null": "off",
    //     "no-eval": "error",
    //     "no-extend-native": "error",
    //     "no-extra-bind": "error",
    //     "no-extra-label": "error",
    //     "no-extra-parens": "error",
    //     "no-floating-decimal": "error",
    //     "no-implicit-coercion": [
    //         "error",
    //         {
    //             "boolean": false,
    //             "number": false,
    //             "string": false
    //         }
    //     ],
    //     "no-implicit-globals": "error",
    //     "no-implied-eval": "error",
    //     "no-inline-comments": "off",
    //     "no-inner-declarations": [
    //         "error",
    //         "functions"
    //     ],
    //     "no-invalid-this": "off",
    //     "no-iterator": "error",
    //     "no-label-var": "error",
    //     "no-labels": "error",
    //     "no-lone-blocks": "error",
    //     "no-lonely-if": "error",
    //     "no-loop-func": "off",
    //     "no-magic-numbers": "off",
    //     "no-misleading-character-class": "error",
    //     "no-mixed-operators": "off",
    //     "no-mixed-requires": "error",
    //     "no-multi-assign": "off",
    //     "no-multi-spaces": "off",
    //     "no-multi-str": "error",
    //     "no-multiple-empty-lines": "off",
    //     "no-native-reassign": "error",
    //     "no-negated-condition": "off",
    //     "no-negated-in-lhs": "error",
    //     "no-nested-ternary": "off",
    //     "no-new": "off",
    //     "no-new-func": "off",
    //     "no-new-object": "error",
    //     "no-new-require": "error",
    //     "no-new-wrappers": "error",
    //     "no-octal-escape": "error",
    //     "no-param-reassign": "off",
    //     "no-path-concat": "error",
    //     "no-plusplus": "off",
    //     "no-process-env": "off",
    //     "no-process-exit": "error",
    //     "no-proto": "off",
    //     "no-prototype-builtins": "error",
    //     "no-restricted-globals": "error",
    //     "no-restricted-imports": "error",
    //     "no-restricted-modules": "error",
    //     "no-restricted-properties": "error",
    //     "no-restricted-syntax": "error",
    //     "no-return-assign": "off",
    //     "no-return-await": "error",
    //     "no-script-url": "error",
    //     "no-self-compare": "off",
    //     "no-sequences": "off",
    //     "no-shadow": "off",
    //     "no-shadow-restricted-names": "error",
    //     "no-spaced-func": "error",
    //     "no-sync": "error",
    //     "no-tabs": [
    //         "error",
    //         {
    //             "allowIndentationTabs": true
    //         }
    //     ],
    //     "no-template-curly-in-string": "error",
    //     "no-ternary": "off",
    //     "no-throw-literal": "error",
    //     "no-trailing-spaces": "off",
    //     "no-undef-init": "error",
    //     "no-undefined": "error",
    //     "no-underscore-dangle": "off",
    //     "no-unmodified-loop-condition": "error",
    //     "no-unneeded-ternary": "off",
    //     "no-unused-expressions": "off",
    //     "no-use-before-define": "off",
    //     "no-useless-call": "off",
    //     "no-useless-catch": "error",
    //     "no-useless-computed-key": "error",
    //     "no-useless-concat": "error",
    //     "no-useless-constructor": "error",
    //     "no-useless-rename": "error",
    //     "no-useless-return": "error",
    //     "no-var": "off",
    //     "no-void": "off",
    //     "no-warning-comments": "error",
    //     "no-whitespace-before-property": "error",
    //     "no-with": "error",
    //     "nonblock-statement-body-position": "error",
    //     "object-curly-newline": "error",
    //     "object-curly-spacing": "off",
    //     "object-shorthand": "off",
    //     "one-var": "off",
    //     "one-var-declaration-per-line": "off",
    //     "operator-assignment": [
    //         "error",
    //         "always"
    //     ],
    //     "operator-linebreak": "error",
    //     "padded-blocks": "off",
    //     "padding-line-between-statements": "error",
    //     "prefer-arrow-callback": "off",
    //     "prefer-const": "off",
    //     "prefer-destructuring": "off",
    //     "prefer-numeric-literals": "error",
    //     "prefer-object-spread": "error",
    //     "prefer-promise-reject-errors": "error",
    //     "prefer-reflect": "off",
    //     "prefer-rest-params": "off",
    //     "prefer-spread": "off",
    //     "prefer-template": "off",
    //     "quote-props": "off",
    //     "quotes": "off",
    //     "radix": [
    //         "error",
    //         "as-needed"
    //     ],
    //     "require-atomic-updates": "error",
    //     "require-await": "error",
    //     "require-jsdoc": "off",
    //     "require-unicode-regexp": "off",
    //     "rest-spread-spacing": [
    //         "error",
    //         "never"
    //     ],
    //     "semi": "off",
    //     "semi-spacing": [
    //         "error",
    //         {
    //             "after": false,
    //             "before": false
    //         }
    //     ],
    //     "semi-style": [
    //         "error",
    //         "last"
    //     ],
    //     "sort-keys": "off",
    //     "sort-vars": "off",
    //     "space-before-blocks": "off",
    //     "space-before-function-paren": "off",
    //     "space-in-parens": [
    //         "error",
    //         "never"
    //     ],
    //     "space-infix-ops": "off",
    //     "space-unary-ops": [
    //         "error",
    //         {
    //             "nonwords": false,
    //             "words": false
    //         }
    //     ],
    //     "spaced-comment": "off",
    //     "strict": "off",
    //     "switch-colon-spacing": [
    //         "error",
    //         {
    //             "after": false,
    //             "before": false
    //         }
    //     ],
    //     "symbol-description": "error",
    //     "template-curly-spacing": [
    //         "error",
    //         "never"
    //     ],
    //     "template-tag-spacing": "error",
    //     "unicode-bom": [
    //         "error",
    //         "never"
    //     ],
    //     "valid-jsdoc": "error",
    //     "vars-on-top": "off",
    //     "wrap-iife": "off",
    //     "wrap-regex": "off",
    //     "yield-star-spacing": "error",
    //     "yoda": "off"
    // }
};