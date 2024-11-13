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
                sshagent(['id_rsa_jenkins']) {
                    sh "ping -c 5 192.168.2.21"
                    //sh "scp -r ${WORKSPACE}/Ing2-proto/proto-back/target/proto-back-*.jar episaine@192.168.2.21:${DEPLOY_PATH}" 
                    //sh "ssh episaine@192.168.1.11 'chmod +x ${DEPLOY_PATH}/deploy.sh && ${DEPLOY_PATH}/deploy.sh'"

                    sh "ping -c 5 192.168.2.22"
                    //sh "scp -r ${WORKSPACE}/Ing2-proto/proto-front/build/ episaine@192.168.2.22:${DEPLOY_PATH}" 
                    //sh "ssh episaine@192.168.1.12 'chmod +x ${DEPLOY_PATH}/deploy.sh && ${DEPLOY_PATH}/deploy.sh'"
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
