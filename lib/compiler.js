const { getAST, getDependencies, transform } = require('./parser');
const path = require('path');
const fs = require('fs');
module.exports = class Compiler{
    constructor(options) {
        const { entry, output } = options;
        this.entry = entry;
        this.output = output;
        this.modules = []; // 最终处理好的所有模块的信息
    }
    run() {
        const entryModule = this.buildModule(this.entry, true);
        this.modules.push(entryModule);
        this.modules.map(_module => {
            _module.dependencies.map(dependency => {
                this.modules.push(this.buildModule(dependency));
            });
        });
        // 输出获取和转译结果
        this.emitFiles();
    }
    buildModule(filename, isEntry) {
        let ast;
        if(isEntry) {
            ast = getAST(filename);
        }
        else {
            const absolutePath = path.join(process.cwd(), './src', filename);
            ast = getAST(absolutePath);
        }

        return {
            filename,
            dependencies: getDependencies(ast),
            transformCode: transform(ast)
        }
    }
    emitFiles() {
        const outputPath = path.join(this.output.path, this.output.filename);
        let modules = '';
        this.modules.map(_module => {
            modules += `'${ _module.filename }': function (require, module, exports) { ${ _module.transformCode } },`
        })
        const bundle = `(function(modules) {
            function require(filename) {
                var fn = modules[filename];
                var module = { exports: {} };

                fn(require, module, module.exports);
                return module.exports;
            }
            require('${this.entry }');
        })({ ${ modules } })`; // 自执行函数，即webpack打包的那一层包裹
        fs.writeFileSync(outputPath, bundle, 'utf-8');

    }
}