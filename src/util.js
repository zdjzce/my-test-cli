const fs = require('fs');
const symbol = require('log-symbols');
const chalk = require('chalk');
const inquirer =  require('inquirer');
const promptList = require('../config/promptList.json');
const downloadGit = require('download-git-repo');

// 文件是否存在
let notExistFold = async (name) => {
    return new Promise((resolve) => {
        if (fs.existsSync(name)) {
            console.log(symbol.error, chalk.red('文件夹名已被占用，请更换名字重新创建'));
        } else {
            resolve();
        }
    });
}

// 询问用户
let prompt = () => {
    return new Promise(resolve => {
        inquirer
            .prompt(promptList.promptList)
            .then(answer => {
                resolve(answer);
            })
    });
}

// 项目模板远程下载
let  downloadTemplate = async (ProjectName, api) => {
    return new Promise((resolve, reject) => {
        downloadGit(api, ProjectName, {clone: true}, (err) => {
            if(err){
                reject(err);
            }else{
                resolve();
            }
        })
    });
};

// 



module.exports = {
  notExistFold,
  prompt,
  downloadTemplate,
}