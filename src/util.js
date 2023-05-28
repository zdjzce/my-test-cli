const fs = require('fs');
const symbol = require('log-symbols');
const chalk = require('chalk');
const inquirer = require('inquirer');
const promptList = require('../config/promptList.json');
const directoryTree = require('../config/directoryTree.json');
const { spawn } = require('child_process');
const { exec } = require('child_process');
const git = require('simple-git')
// const git = require('isomorphic-git')
// const http = require('isomorphic-git/http/node')


// 文件是否存在
let notExistFold = async (name) => {
  return new Promise((resolve) => {
    if (fs.existsSync(name)) {
      console.log(symbol.error, chalk.red('文件夹名已被占用，请更换名字重新创建'));
    } else {
      fs.mkdirSync(name);
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
let downloadTemplate = async (dir, ProjectName) => {
  return new Promise(async resolve => {
    for (const choice_item of directoryTree.choice_project) {
      if (choice_item.project_name === ProjectName) {
        process.chdir(dir);
        await createDirectories(choice_item.root_directory)
        resolve()
      }
    }
  });
};

// 遍历文件夹树并递归创建子文件夹，如果有git仓库地址就clone，没有就只创建文件夹
async function createDirectories (directory) {

  return new Promise(async resolve => {
    if (directory.name && !fs.existsSync(directory.name) && directory.repo_url) {
      await cloneLibrary(directory)
      process.chdir(directory.name)
    }
  
  
    if (directory.children) {
      for (const childDirectory of directory.children) {
        await createDirectories(childDirectory);
        process.chdir('..');
      }
    }

    resolve()
  })



}

function cloneLibrary (directory) {

  return new Promise(resolve => {

    exec(`git clone ${directory.repo_url}`, (error, stdout, stderr) => {
      error && console.log(`stdout: ${error}`);
      stderr && console.log(`${stderr}`);
      spawn('sh', [
        '-c',
        `cd ${directory.name} && npm install`
      ])
      resolve()
    })

  })
  
  
}


module.exports = {
  notExistFold,
  prompt,
  downloadTemplate,
}