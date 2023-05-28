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
  return new Promise((resolve, reject) => {
    directoryTree.choice_project.forEach(dic => {
      if (dic.project_name === ProjectName) {
        process.chdir(dir);
        createDirectories(dic.root_directory)
      }
    })
  });
};

// 遍历文件夹树并递归创建子文件夹，如果有git仓库地址就clone，没有就只创建文件夹
async function createDirectories (directory) {

  if (directory.name && !fs.existsSync(directory.name) && directory.repo_url) {
    const p = await cloneLibrary(directory)
    await p.then(() => {
      process.chdir(directory.name)
    })
  }


  if (directory.children) {
    directory.children.forEach(async childDirectory => {
      const p = await createDirectories(childDirectory)
      await p.then(() => {
        process.chdir('..')
      })
    });
  }

  return Promise.resolve();
}

function cloneLibrary (directory) {
  
  return new Promise((resolve, reject) => {
    exec(`git clone ${directory.repo_url}`, (error, stdout, stderr) => {
      error && console.log(`stdout: ${error}`);
      stderr && console.log(`stderr: ${stderr}`);
      resolve()
    })

    // cloneProcess.on('close', (code) => {
    //   if (code !== 0) {
    //     console.log(`git clone process exited with code ${code}`);
    //   } else {
    //     /* spawn('sh', [
    //       '-c',
    //       `cd ${directory.name} && npm install`
    //     ]) */
        
    //     console.log('is close')
    //   }
    // });
  })

  // return git().clone(directory.repo_url)


}


module.exports = {
  notExistFold,
  prompt,
  downloadTemplate,
}