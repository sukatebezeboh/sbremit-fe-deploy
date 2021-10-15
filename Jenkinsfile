pipeline {
    agent any
    parameters {
        string(name: 'target_env', defaultValue: "prod", description: "The target build environment")
    }
    environment {
        HOME = '.'
    }
    stages {
        stage("Build React Application") {
            steps {
                sh """
                    npm install && npm run build:production
                """
            }
        }
        stage("Build Docker Image") {
            steps {
                echo "Build Docker Image"
                script {
                    webImage = docker.build("hub.almamaters.club:5000/sbremit/web:${target_env}", ".")
                }
            }
        }
        stage("Push to Docker Registry") {
            steps {
                echo "Push to Docker Hub"
                script {
                    docker.withRegistry("https://hub.almamaters.club:5000") {
                        webImage.push()
                    }
                }
            }
        }
        stage("Deploy app to target server") {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'root-ssh', keyFileVariable: 'SSH_ROOT_USER', passphraseVariable: '', usernameVariable: '')]) {
                    ansiblePlaybook(
                        credentialsId: 'root-ssh', 
                        inventory: './ansible/hosts', 
                        playbook: './ansible/playbooks/deploy-sbremit.yml', 
                        disableHostKeyChecking: true,
                        extras: "-e TARGET_ENV=${params.target_env}"
                    )
                }
            }
        }
    }
}