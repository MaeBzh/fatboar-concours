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
        /*stage('SonarQube analysis') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'sonar-login', variable: 'login')]) {
                        withCredentials([string(credentialsId: 'sonar-pwd', variable: 'password')]) {
                            docker.image('newtmitch/sonar-scanner').inside('-v /var/run/docker.sock:/var/run/docker.sock --entrypoint="" --net root_jenkins-nw') {
                                sh '''/usr/local/bin/sonar-scanner \\
                                    -Dsonar.host.url=http://sonarqube:9000 \\
                                    -Dsonar.projectBaseDir=.\\
                                    -Dsonar.projectKey=fatboar-api \\
                                    -Dsonar.projectName=fatboar-api \\
                                    -Dsonar.login="${login}" \\
                                    -Dsonar.password="${password}" \\
                                    -Dsonar.verbose=true''' 
                            }
                        }
                    }
                }
            }
        }*/
    }
} 
