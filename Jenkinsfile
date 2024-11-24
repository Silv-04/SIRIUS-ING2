pipeline {
    agent any
    environment {
        REPO_URL = 'https://github.com/Silv-04/SIRIUS-ING2.git'
        DEPLOY_PATH = '/home/episaine/jenkins'
        BRANCH = 'dev'
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
                sh "cd episaine-back/ && mvn clean install -P${BRANCH}"
                sh '''
                cd episaine-front/
                npm ci
                npm run build -- --mode {BRANCH}
                '''
            }
        }
        stage('Déploiement') {
            steps {
                sshagent(['id_rsa_jenkins']) {
                    // Déploiement backend
                    sh "scp -r ${WORKSPACE}/episaine-back/target/*.jar episaine@192.168.1.11:${DEPLOY_PATH}"
                    sh """
                    ssh episaine@192.168.1.11 'chmod +x ${DEPLOY_PATH}/deploy.sh && nohup ${DEPLOY_PATH}/deploy.sh > ${DEPLOY_PATH}/deploy_back.log 2>&1 &'
                    """

                    // Déploiement frontend
                    sh "scp -r ${WORKSPACE}/episaine-front/build/ episaine@192.168.1.12:${DEPLOY_PATH}"
                    sh """
                    ssh episaine@192.168.1.12 'chmod +x ${DEPLOY_PATH}/deploy.sh && nohup ${DEPLOY_PATH}/deploy.sh > ${DEPLOY_PATH}/deploy_front.log 2>&1 &'
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
