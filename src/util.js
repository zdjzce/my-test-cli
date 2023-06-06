const fs = require('fs');
const symbol = require('log-symbols');
const chalk = require('chalk');
const inquirer = require('inquirer');
const promptList = require('../config/promptList.json');
const directoryTree = require('../config/directoryTree.json');
const { exec } = require('child_process');


// 文件是否存在
const notExistFold = async (name) => {
  if (fs.existsSync(name)) {
    console.log(symbol.error, chalk.red('文件夹名已被占用，请更换名字重新创建'));
  } else {
    fs.mkdirSync(name);
  }
}

// 询问用户
const prompt = async () => {
  const answer = await inquirer.prompt(promptList.promptList)

  return answer
}

// 项目模板远程下载
const downloadTemplate = async (dir, ProjectName) => {
  for (const choice_item of directoryTree.choice_project) {
    if (choice_item.project_name === ProjectName) {
      process.chdir(dir);
      await createDirectories(choice_item.root_directory)
    }
  }
};

// 遍历文件夹树并递归创建子文件夹，如果有git仓库地址就clone，没有就只创建文件夹
const createDirectories = async (directory) => {

  if (directory.name && !fs.existsSync(directory.name) && directory.repo_url) {
    await cloneLibrary(directory)
    process.chdir(directory.name)
  } else if (directory.name && !fs.existsSync(directory.name)) {
    fs.mkdirSync(directory.name);
    process.chdir(directory.name)
  }


  if (directory.children) {
    for (const childDirectory of directory.children) {
      await createDirectories(childDirectory);
      process.chdir('..');
    }
  }

}

const cloneLibrary = async (directory) {

  exec(`git clone ${directory.repo_url}`, (error, stdout, stderr) => {
    error && console.log(`stdout: ${error}`);
    stderr && console.log(`${stderr}`);
    exec(`cd ${directory.name}`)
  })
  
}


module.exports = {
  notExistFold,
  prompt,
  downloadTemplate,
}