// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const fs = require("fs");
const postcss = require("postcss");

const postcssProcessor = postcss([
  require("autoprefixer"),
  require("postcss-nested")
]);

const payloads = [
  {
    name: "example.css",
    options: { from: `third_party/${name}`, map: false }
  }
].map(({ name, options }) => ({
  payload: fs.readFileSync(`third_party/${name}`, "utf8"),
  options
}));

module.exports = {
  name: "postcss",
  fn() {
    return payloads.map(({ payload, options }) => {
      return postcssProcessor.process(payload, options).then(result => {
        return result.css;
      });
    });
  }
};
