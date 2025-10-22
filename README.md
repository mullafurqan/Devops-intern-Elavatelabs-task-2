# Jenkins CI/CD Pipeline on AWS EC2 (Node.js + Docker)

This project demonstrates a **full CI/CD setup** using **Jenkins**, **Docker**, and **AWS EC2** for a simple Node.js app.

---

## Step 1: Launch an EC2 Instance
- AWS Console → EC2 → Launch Instance
- AMI: Ubuntu 22.04 LTS
- Instance type: t2.medium (2 vCPU, 4GB RAM)
- Security group:
  - SSH: 22 → your IP
  - HTTP: 80 → 0.0.0.0/0
  - Jenkins: 8080 → 0.0.0.0/0
  - Docker App: 3000 → 0.0.0.0/0
- Key pair: create or use existing → download `.pem` file

---

## Step 2: Connect to EC2 via SSH
```bash
chmod 400 your-key.pem
ssh -i "your-key.pem" ubuntu@<EC2_PUBLIC_IP>
```
## Step 3: Install Jenkins
bash

```bash
sudo apt update
sudo apt install openjdk-11-jdk -y
java -version
```
```bash

curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
    /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
    https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
    /etc/apt/sources.list.d/jenkins.list > /dev/null

sudo apt update
sudo apt install jenkins -y
sudo systemctl start jenkins
sudo systemctl enable jenkins
sudo systemctl status jenkins
```
## Step 4: Install Docker
bash
```bash
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu
Log out and back in to apply Docker permissions.
```
## Step 5: Access Jenkins
Browser → http://<EC2_PUBLIC_IP>:8080

Unlock Jenkins:

bash

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
Install Suggested Plugins → Create Admin User
```

## Step 6: Prepare Your Project
Create folder structure:

go

myapp/
 ├─ app.js
 ├─ package.json
 ├─ Dockerfile
 └─ Jenkinsfile
## app.js
javascript

```bash
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('🚀 Hello from Jenkins CI/CD Pipeline running on EC2!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```
## package.json
json

```bash
{
  "name": "jenkins-demo-app",
  "version": "1.0.0",
  "description": "A simple Node.js app for Jenkins CI/CD demo",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```
## Dockerfile
dockerfile

```bash
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
```
## Step 7: Test Locally (Optional)
bash
```bash
sudo apt install nodejs npm -y
npm install
node app.js
```
Browser → http://<EC2_PUBLIC_IP>:3000
Expected output: 🚀 Hello from Jenkins CI/CD Pipeline running on EC2!

## Step 8: Configure Jenkins Pipeline
Jenkins → New Item → Pipeline → OK

Definition: Pipeline script from SCM

SCM: Git → Repo URL: https://github.com/yourusername/your-repo.git

Branch: main

## Step 9: Trigger Pipeline on Git Push
Jenkins
Configure → Build Triggers → GitHub hook trigger for GITScm polling

GitHub
Repo → Settings → Webhooks → Add webhook

Payload URL: http://<EC2_PUBLIC_IP>:8080/github-webhook/

Content type: application/json

Event: Just push events

## Step 10: Test Pipeline
bash

```bash
git add .
git commit -m "Test Jenkins pipeline"
git push origin main
```
Jenkins should:

Checkout code

Build Docker image

Run tests

Deploy container on EC2

Browser → http://<EC2_PUBLIC_IP>:3000 ✅
