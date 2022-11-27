const loaderUtils = require('loader-utils');
const fs = require('fs');
const path = require('path');
module.exports = function(source) {
    const { name } = this.query;
    const url = loaderUtils.interpolateName(this, "[name].[ext]", {
        source,
    });
    // this.emitFile(path.join(__dirname, url), source);
    // const options = loaderUtils.getOptions(this);
    // console.log(options);
    this.cacheable(false);
    const json = JSON.stringify(source)
    .replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029'); // 为了安全起见，ES6模板字符串的问题（存在一定的安全问题，所以做一定的安全处理）
    // const callback = this.async();
    // fs.readFile(path.join(__dirname, '../src/demo.txt'), 'utf-8', (error, data) => {
    //     if(error) {
    //         callback(error, '');
    //     }
    //     callback(null, data);
    // })
    return `export default ${json}`;
    // this.callback(null, json);
    // this.callback(new Error('error'), json, res1, res2); // 抛出错误方式，多个值传出

};
