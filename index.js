let stored_answers = require('./questions');
let fs = require('fs');

console.log('IN INDEX!!!');

function firePipeline(answers) {
    let job_string = `${answers.repo_name}/${answers.branch_name}`;
    let cred_string = `${answers.jenkins_username}:${answers.jenkins_token}`;
    let cli_exe = `java -jar ${answers.cli_path} -auth ${cred_string} -http -s ${answers.jenkins_url}`;

    let lint_string = '';
    if (answers.is_declarative){
        lint_string = `cat ${answers.jenkinsfile_path} | ${cli_exe} declarative-linter && `
    }

    let execution_string = `${lint_string} ` +
        `cat ${answers.jenkinsfile_path} | ${cli_exe} replay-pipeline ${job_string} -n ${answers.build_number} && ` +
        `${cli_exe} console ${job_string} -f`;

    console.log(`Execution string: ${execution_string}`);

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
    })
}

let answersFilepath = `${__dirname}/answers.json`;
answers = JSON.parse(fs.readFileSync(answersFilepath, 'utf8'));

console.log(`answers: ${JSON.stringify(answers)}`);
console.log();

firePipeline(answers);