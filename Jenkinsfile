pipeline {
    agent any
    environment {
        IMAGE_NAME = "myapp:latest"
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/mullafurqan/Devops-intern-Elavatelabs-task-2.git
'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${IMAGE_NAME}")
                }
            }
        }
        stage('Test') {
            steps {
                echo "Running tests..."
                sh 'echo "No tests yet!"'
            }
        }
        stage('Deploy') {
            steps {
                script {
                    sh 'docker rm -f myapp || true'
                    sh 'docker run -d -p 3000:3000 --name myapp ${IMAGE_NAME}'
                }
            }
        }
    }
}
