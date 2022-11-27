const fs = require('fs');
const path = require('path');
const { runLoaders } = require('loader-runner');
runLoaders(
    // {
    //     resource: path.join(__dirname, '../src/demo.txt'), // 资源绝对路径
    //     loaders: [
    //         {
    //             loader: path.resolve(__dirname, './raw-loader.js'),
    //             options: {
    //                 name: 'test'
    //             }
    //         }
    //     ],
    //     context: {
    //         minimize: true
    //     },
    //     readResource: fs.readFile.bind(fs),
    // },
    {
        resource: path.join(__dirname, '../src/index.css'),
        loaders: [
            {
                loader: path.resolve(__dirname, './sprite-loader.js')
            }
        ],
        context: {
            minimize: true
        },
        readResource: fs.readFile.bind(fs),
    },
    (err, result) => {
        err ? console.log(err) : console.log(result)
    }
)