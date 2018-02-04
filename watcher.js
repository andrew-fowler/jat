'use strict';
let inquirer = require('inquirer');
let fs = require('fs');
let questions = require('./questions');
var nodemon = require('nodemon');

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


function firePipeline(answers) {
    let job_string = `${answers.repo_name}/${answers.branch_name}`;
    let cred_string = `${answers.jenkins_username}:${answers.jenkins_token}`;
    let cli_exe = `java -jar ${answers.cli_path} -auth ${cred_string} -http -s ${answers.jenkins_url}`;
    let execution_string = `cat ${answers.jenkinsfile_path} | ${cli_exe} declarative-linter && ` +
        `cat ${answers.jenkinsfile_path} | ${cli_exe} replay-pipeline ${job_string} -n ${answers.build_number} && ` +
        `${cli_exe} console ${job_string} -f`;

    const {spawn} = require('child_process');
    const child = spawn("sh", ["-c", execution_string]);

    child.stdout.setEncoding('utf8').on('data', (chunk) => {
        console.log(chunk);
    });

    child.stderr.setEncoding('utf8').on('data', (chunk) => {
        console.log(chunk);
    });

    child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}

inquirer.prompt(questions.spec).then(answers => {
    fs.writeFileSync('answers.json', JSON.stringify(answers), 'utf8');

    validateUrl(answers.jenkins_url);
    validateUsername(answers.username);
    validateJenkinsfilePath(answers.jenkinsfile_path);
    validateCliPath(answers.cli_path);

    nodemon(`-w ${answers.jenkinsfile_path}`);
    console.log(`Watching: ${answers.jenkinsfile_path}`);

    nodemon.on('restart', function (files) {
        firePipeline(answers);
    });
});