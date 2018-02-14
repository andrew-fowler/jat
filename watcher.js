'use strict';
let inquirer = require('inquirer');
let fs = require('fs');
let questions = require('./questions');
let nodemon = require('nodemon');

function validateUrl(url){

}

function validateUsername(username){

}

function validateCliPath(path){
    if(!fs.existsSync(path)){
        throw Error(`CLI not found on specified path: ${path}`)
    }
}

function validateJenkinsfilePath(path){
    if(!fs.existsSync(path)){
        throw Error(`Jenkinsfile not found on specified path: ${path}`)
    }
}

inquirer.prompt(questions.spec).then(answers => {
    fs.writeFileSync(`${__dirname}/answers.json`, JSON.stringify(answers), 'utf8');

    validateUrl(answers.jenkins_url);
    validateUsername(answers.username);
    validateJenkinsfilePath(answers.jenkinsfile_path);
    validateCliPath(answers.cli_path);

    // nodemon(`-w ${answers.jenkinsfile_path}`);
    nodemon(`-C ${__dirname}/index.js -w ${answers.jenkinsfile_path}`);
    console.log(`>>> Watching: ${answers.jenkinsfile_path}`);

    nodemon.on('restart', function (files) {
        console.log(`>>> Caught restart event`);
    });
});