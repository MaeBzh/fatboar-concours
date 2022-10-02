pipeline {
    agent {
        docker { image 'python3.9-nodejs16-alpine' }
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
        stage('perf') {
            steps {
                sh 'pip install bzt && bzt "./test/perf.jmx"'
            }
        } 
    }
} 
