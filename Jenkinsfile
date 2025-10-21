pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // ✅ Use proper single-line string for the URL
                git branch: 'main', url: 'https://github.com/mullafurqan/Devops-intern-Elavatelabs-task-2.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t myapp:latest .'
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
            }
        }
    }
}
