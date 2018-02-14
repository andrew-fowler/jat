# JAT - Jenkinsfile Auto Tester

# Getting started

- `npm install`
- `node watcher.js`

alternatively add an alias to your shell, e.g.

```text
echo 'alias jat="node `pwd`/watcher.js"' >> ~/.zshrc
```

# Execution

Running the tool will prompt for the following information:

- What's your jenkins URL? (e.g. https://jenkins.example.com)
- What's your jenkins username? (e.g. johnsmith) 
- What's your jenkins token/API key? (e.g. 1cd736c99432a2092c86e5f832783c73) 
- What's your repo name? (e.g. authenticator) 
- What's your branch name? (e.g. AUTH-215) 
- What's the path to your Jenkins CLI? (e.g. /lib/jenkins-cli.jar) 
- What's the build number you'd like to base your replay on? (e.g. 1) 
- What's the path to the jenkinsfile you'd like to use? (e.g. /projects/authenticator/Jenkinsfile)

Your Jenkins API Token can be taken from your User page on the Jenkins instance.

The Jenkins CLI should be downloadable from your instance, e.g. https://jenkins.example.com/jnlpJars/jenkins-cli.jar.

If you have ran the tool before it will remember the previous values and prompt you with them as defaults, selectable by hitting Return.

Once the tool is running, saving any changes to the specified Jenkinsfile should fire the pipeline and stream the results to your terminal.

To exit the runner, ctrl-c.

# TO DO

- Create an installer to
  - npm install
  - set an alias (alias watcher='node /Users/andrewfowler/projects/watcher/watcher.js')
  - curl the latest cli client (if appropriate)
- Add cli client to /bin
- Remove eg()s from questions if there is an existing answer

# Issues
- The Jenkins CLI can occasionally throw a StreamException, killing the local stream.