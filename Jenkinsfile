pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Backend Tests') {
            steps {
                echo 'Running backend tests...'

                dir('backend') {
                    bat 'mvnw.cmd test'
                }
            }
        }

        stage('Backend Build') {
            steps {
                echo 'Building Spring Boot application...'

                dir('backend') {
                    bat 'mvnw.cmd clean package -DskipTests'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                echo 'Installing frontend dependencies...'

                dir('frontend') {
                    bat 'npm ci'
                    bat 'npm run build'
                }
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker images...'

                bat 'docker compose build'
            }
        }
    }

    post {

        success {
            echo 'CI PIPELINE SUCCESSFUL'
        }

        failure {
            echo 'CI PIPELINE FAILED'
        }

        always {
            echo 'Pipeline execution completed.'
        }
    }
}