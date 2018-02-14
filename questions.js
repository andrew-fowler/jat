let fs = require('fs');

let default_answers = {
    "jenkins_url":"https://example.jenkins.com",
    "jenkins_username":"forename.surname",
    "jenkins_token":"8dc236c99432a2092e86e5f832783c73",
    "repo_name":"authenticator",
    "branch_name":"AUTH-215",
    "is_declarative":false,
    "cli_path":"/Users/anonymous/jenkins-cli.jar",
    "build_number":"91",
    "jenkinsfile_path":"/Users/anonymous/projects/authenticator/Jenkinsfile"
};

function getDefaultAnswers() {
    let answersFilepath = `${__dirname}/answers.json`;
    if (fs.existsSync(answersFilepath)) {
        return JSON.parse(fs.readFileSync(answersFilepath, 'utf8'));
    }
    return default_answers;
}

let answers = getDefaultAnswers();

module.exports = { spec: [
    {
        type: 'input',
        name: 'jenkins_url',
        message: "What's your jenkins URL?",
        default: function () {
            return answers.jenkins_url;
        }
    },
    {
        type: 'input',
        name: 'jenkins_username',
        message: "What's your jenkins username?",
        default: function () {
            return answers.jenkins_username;
        }
    },
    {
        type: 'input',
        name: 'jenkins_token',
        message: "What's your jenkins token/API key?",
        default: function () {
            return answers.jenkins_token;
        }
    },
    {
        type: 'input',
        name: 'repo_name',
        message: "What's your repo name?",
        default: function () {
            return answers.repo_name;
        }
    },
    {
        type: 'input',
        name: 'branch_name',
        message: "What's your branch name?",
        default: function () {
            return answers.branch_name;
        }
    },
    {
        type: 'confirm',
        name: 'is_declarative',
        message: "Is your pipeline Declarative?",
        default: function () {
            return answers.is_declarative;
        }
    },    
    {
        type: 'input',
        name: 'cli_path',
        message: "What's the path to your Jenkins CLI?",
        default: function () {
            return answers.cli_path;
        }
    },
    {
        type: 'input',
        name: 'build_number',
        message: "What's the build number you'd like to base your replay on?",
        default: function () {
            return answers.build_number;
        }
    },
    {
        type: 'input',
        name: 'jenkinsfile_path',
        message: "What's the path to the Jenkinsfile you'd like to use?",
        default: function () {
            return answers.jenkinsfile_path;
        }
    }
]};