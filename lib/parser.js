// 转换代码为ast
const fs = require('fs');
const babylon = require('babylon');
const babelTraverse = require('babel-traverse').default;
const { transformFromAst } = require('babel-core');
module.exports = {
    getAST: (path) => {
        const source = fs.readFileSync(path, 'utf-8');

        return babylon.parse(source, {sourceType: 'module'});
    },
    getDependencies: (ast) => {
        const dependencies = [];
        babelTraverse(ast, {
            // 分析import语句
            ImportDeclaration: ({node}) => {
                dependencies.push(node.source.value);
            }
        });
        return dependencies;
    },
    //  ast 转为源码
     transform: (ast) => {
        const { code } = transformFromAst(ast, null, {
            presets: ['env'] // 可以解析2015-2017之类的语法
        });

        return code;
     }
}