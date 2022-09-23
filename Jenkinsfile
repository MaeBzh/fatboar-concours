pipeline {
    agent {
        docker { image 'node:latest' }
    }
    
    stages {
        stage('clone') {
            steps {
                git branch: 'main',
                    credentialsId: '809ce604-7c6f-4a65-9b48-348ea079073d',
                    url: 'https://github.com/MaeBzh/fatboar-concours.git'
                sh 'cd ../ && ls'
            }
        }
        stage('build')  {
            steps {
                 sh 'sh jenkins.sh'
            }
        }
        stage('test') {
            steps {
                sh 'cd fatboar-api && ls && npm install && npm test'
            }
        }
        stage('SonarQube analysis') {
            steps {
                script {
                    docker.image('newtmitch/sonar-scanner').inside('-v /var/run/docker.sock:/var/run/docker.sock --entrypoint="" --net root_jenkins-nw') {
                        sh '''/usr/local/bin/sonar-scanner \\
                            -Dsonar.host.url=http://195.15.236.15:9000 \\
                            -Dsonar.projectBaseDir=.\\
                            -Dsonar.projectKey=fatboar-concours \\
                            -Dsonar.projectName=fatboar-concours \\
                            -Dsonar.sources=src/ \\
                            -Dsonar.exclusions=dist/** \\
                            -Dsonar.login=3d221b0cdb3e09d66ff542107b812d147a47c1af \\
                            -Dsonar.verbose=true''' 
                    }
                }
            }
        }
    }
} 
