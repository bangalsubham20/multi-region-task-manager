pipeline {

    agent any

    stages {

        stage('Check Environment') {
            steps {
                bat 'java -version'
                bat 'git --version'
                bat 'node --version'
                bat 'npm --version'
                bat 'docker --version'
                bat 'docker compose version'
            }
        }

        stage('Run Backend Tests') {
            steps {
                bat '''
                    cd backend
                    mvnw.cmd test
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                bat 'docker compose build'
            }
        }

        stage('Deploy Application') {
            steps {
                bat 'docker compose up -d'
            }
        }

        stage('Check Containers') {
            steps {
                bat 'docker compose ps'
            }
        }

        stage('Health Check') {
            steps {
                echo 'Checking application health...'
                retry(5) {
                    sleep time: 5, unit: 'SECONDS'
                    bat '''
                        curl.exe --fail http://localhost:8080/api/v1/actuator/health
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'CI/CD PIPELINE SUCCESSFUL'
        }

        failure {
            echo 'CI/CD PIPELINE FAILED'
        }

        always {
            echo 'Pipeline execution completed.'
        }
    }
}