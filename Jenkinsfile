pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
<<<<<<< HEAD
                // ✅ Use proper single-line string for the URL
                git branch: 'main', url: 'https://github.com/mullafurqan/Devops-intern-Elavatelabs-task-2.git'
=======
                git 'https://github.com/mullafurqan/Devops-intern-Elavatelabs-task-2.git
'
>>>>>>> 2c8f99dfe79d0e66f2fe15da07e03008542cab8e
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat 'docker build -t myapp:latest .'
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
