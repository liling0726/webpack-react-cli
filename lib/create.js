const fs = require('fs-extra');
const path = require('path');
const Generator = require('./generator');

module.exports = async function (name,options){
    const  cwd = process.cwd();
    // 需要创建的目录地址
    const targetDir = path.join(cwd,name);
    // 目录已存在
    if(fs.existsSync(targetDir)){

    }
    const generator = new Generator(name, targetDir);
    generator.create()

}