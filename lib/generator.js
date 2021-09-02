const ora = require('ora');
const inquirer = require('inquirer');
const path = require('path');
const downloadGitRepo = require('download-git-repo');
const http = require('./http');

// 加载loading动画
async function wrapLoading(fn, message, ...args){
    const spinner = ora(message);
    spinner.start();

    try {
        const resp = await await fn(...args);
        spinner.succeed();
        return resp;
    } catch (error) {
        spinner.fail('加载失败')
    }
}

const util=require('util');
class Generator{
    constructor(name,targetDir){
        this.name = name;
        this.targetDir = targetDir;
        this.downloadGitRepo = util.promisify(downloadGitRepo);
    }
    async getTag(){
        const tags = await http.getTagList();
        if(!tags || !tags.length){
            return;
        }
        const tagsList = tags.map(item => item.name);
        const { tag } = await inquirer.prompt({
            name: 'tag',
            type:'list',
            choices: tagsList,
            message:'选择一个版本'
        })

        return tag
    }
    // 创建逻辑
    async create(){
       const tag = await this.getTag();
       this.download(tag)
    }
    // 下载模板
    async download(tag){
        await  wrapLoading(
            this.downloadGitRepo,
            'waiting download template',
            `liling0726/react-webpack-template${tag?'#'+tag:''}`,
            path.resolve(process.cwd(),this.targetDir)
            )
        

    }
}

module.exports = Generator;