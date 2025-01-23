pipeline {
    agent any
    environment {
        REPO_URL = 'https://github.com/Silv-04/SIRIUS-ING2.git'
        DEPLOY_PATH = '/home/episaine/jenkins'
        BRANCH = 'main'
        PATH = "/opt/nvm/versions/node/v22.11.0/bin:${env.PATH}"
    }

    stages {
        stage('Cloner le dépôt') {
            steps {
                git url: "${REPO_URL}", branch: "${BRANCH}", credentialsId: 'EPISAINE'
            }
        }
        stage('Build') {
            steps {
                sh "cd episaine-back/ && mvn clean package -P${BRANCH}"
                sh "cd episaine-front/"
                sh "npm ci"
                sh "npm run build:${BRANCH}"
            }
        }
        stage('Déploiement') {
            steps {
                sshagent(['id_rsa_jenkins']) {
                    sh "scp -r ${WORKSPACE}/episaine-back/target/*.jar episaine@192.168.3.31:${DEPLOY_PATH}"
                    sh """
                    ssh episaine@192.168.3.31 'chmod +x ${DEPLOY_PATH}/deploy.sh'
                    """

                    sh "scp -r ${WORKSPACE}/episaine-front/build/ episaine@192.168.3.32:${DEPLOY_PATH}"
                    sh """
                    ssh episaine@192.168.3.32 'chmod +x ${DEPLOY_PATH}/deploy.sh && ${DEPLOY_PATH}/deploy.sh'
                    """
                }
            }
        }
    }
    post {
        success {
            echo 'Déploiement réussi !'
        }
        failure {
            echo 'Échec du déploiement.'
        }
    }
}