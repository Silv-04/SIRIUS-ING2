pipeline {
    agent none
    environment {
        REPO_URL = 'https://github.com/Silv-04/SIRIUS-ING2.git'
        DEPLOY_PATH = '/home/episaine/jenkins'
    }

    stages {
        stage('Cloner le dépôt') {
            steps {
                git url: "${REPO_URL}", branch: 'EPISAINE', credentialsId: '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'
            }
        }

        stage('Build') {
        agent { label 'Test_Back' }
            steps {
                echo 'Build en cours...'
                    sh 'mvn clean install'
                    sh 'mvn package'
            }
        }

        stage('Déploiement') {
        agent { label 'Test_Back' }
            steps {
                sshagent(credentials: ['episaine']) {
                    sh "scp -r ${WORKSPACE}/proto-back episaine@192.168.1.11:${DEPLOY_PATH}" 

                    sh "ssh episaine@192.168.1.11 'chmod +x ${DEPLOY_PATH}/deploy.sh && ${DEPLOY_PATH}/deploy.sh'"
                }
            }
        agent { label 'Test_Front' }
            steps {
                sshagent(credentials: ['episaine']) {
                    sh "scp -r ${WORKSPACE}/proto-front episaine@192.168.1.12:${DEPLOY_PATH}" 

                    sh "ssh episaine@192.168.1.12 'chmod +x ${DEPLOY_PATH}/deploy.sh && ${DEPLOY_PATH}/deploy.sh'"
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