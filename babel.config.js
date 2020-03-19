module.exports = function (api){
  console.log('balel-version',api.version)
  api.cache(true);

  /** 暂时不需要 */
  const presets = [[
        "@babel/preset-env",
            {
                "modules": false,
                "loose": true,
                "targets": {
                    "browsers": [
                        "iOS >= 7",
                        "Android >= 4.0"
                    ]
          },
          "debug": true,
          "useBuiltIns": "entry" //usage   entry
        }
  ]];

  const plugins = [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-regenerator"
  ]
  return {
    plugins
  }
};
  