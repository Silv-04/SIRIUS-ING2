pipeline {
    agent any
    environment {
        REPO_URL = 'https://github.com/Silv-04/SIRIUS-ING2.git'
        DEPLOY_PATH = '/home/episaine/jenkins'
    }

    stages {
        stage('Cloner le dépôt') {
            steps {
                git url: "${REPO_URL}", branch: 'Test', credentialsId: 'EPISAINE'
            }
        }
        stage('Déploiement') {
            steps {
                sshagent(credentials: ['TEST_BACK_SSHKEY']) {
                    sh "scp -r ${WORKSPACE}/proto-back/target/proto-back-*.jar episaine@192.168.1.11:${DEPLOY_PATH}" 
                    sh "ssh episaine@192.168.1.11 'chmod +x ${DEPLOY_PATH}/deploy.sh && ${DEPLOY_PATH}/deploy.sh'"
                }
                sshagent(credentials: ['TEST_FRONT_SSHKEY']) {
                    sh "scp -r ${WORKSPACE}/proto-front/build episaine@192.168.1.12:${DEPLOY_PATH}" 
                    sh "ssh episaine@192.168.1.12 'chmod +x ${DEPLOY_PATH}/deploy.sh && ${DEPLOY_PATH}/deploy.sh'"
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
