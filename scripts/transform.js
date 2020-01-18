// @ts-nocheck
const fs = require("fs");
const babel = require("@babel/core");

function transform(file) {
  const source = fs.readFileSync(file, "utf8");

  const transformed = babel.transformSync(source, {
    plugins: [
      [
        "snowpack/assets/babel-plugin.js",
        {
          // Append .js to all src file imports
          optionalExtensions: true
        }
      ]
    ]
  });

  fs.writeFileSync(file, transformed.code);
}

transform("dist/App.js");
transform("dist/components/Header.js");
transform("dist/components/Footer/index.js");
transform("dist/components/Footer/Links.js");
