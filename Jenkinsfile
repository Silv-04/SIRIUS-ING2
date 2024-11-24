pipeline {
    agent any
    environment {
        REPO_URL = 'https://github.com/Silv-04/SIRIUS-ING2.git'
        DEPLOY_PATH = '/home/episaine/jenkins'
        BRANCH = 'dev'
        env.PATH="/opt/"
    }

    stages {
        stage('Cloner le dépôt') {
            steps {
                git url: "${REPO_URL}", branch: "${BRANCH}", credentialsId: 'EPISAINE'
            }
        }
        stage('Build') {
            steps {
                sh "cd episaine-back/ && mvn clean install -P${BRANCH}"
                sh "cd episaine-front/ && npm install && npm run build -- --mode ${BRANCH}"
            }
        }
        stage('Déploiement') {
            steps {
                sshagent(['id_rsa_jenkins']) {
                    sh "scp -r ${WORKSPACE}/episaine-back/target/*.jar episaine@192.168.1.11:${DEPLOY_PATH}" 
                    sh "ssh episaine@192.168.1.11 'chmod +x ${DEPLOY_PATH}/deploy.sh && nohup /${DEPLOY_PATH}/deploy.sh'"

                    sh 
                    '''
                    export NVM_DIR="/opt/nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                    nvm use --lts
                    '''
                    sh "scp -r ${WORKSPACE}/episaine-front/build/ episaine@192.168.1.12:${DEPLOY_PATH}" 
                    sh "ssh episaine@192.168.1.12 'chmod +x ${DEPLOY_PATH}/deploy.sh && nohup /${DEPLOY_PATH}/deploy.sh'"
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
