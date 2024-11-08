pipeline {
    agent { label 'Back_Test' } // Exécute le pipeline sur le nœud réservé "Back_Test"
    
    environment {
        REPO_URL = 'https://github.com/Silv-04/SIRIUS-ING2.git' // Remplacez par l'URL de votre dépôt
        DEPLOY_PATH = '/home/episaine/jenkins' // Chemin cible sur la VM
    }

    stages {
        stage('Cloner le dépôt') {
            steps {
                // Utilise les identifiants GitHub configurés dans Jenkins
                git url: "${REPO_URL}", branch: 'EPISAINE', credentialsId: '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'
            }
        }

        stage('Build') {
            steps {
                echo 'Build en cours...'
                    sh 'mvn clean install'
                    sh 'mvn package'
            }
        }

        stage('Déploiement') {
            steps {
                // Utilise les identifiants SSH pour copier les fichiers sur la VM
                sshagent(credentials: ['episaine']) {
                    // Copie l'executable du workspace Jenkins vers le répertoire de déploiement sur la VM
                    sh "scp -r ${WORKSPACE}/proto-back episaine@192.168.1.11:${DEPLOY_PATH}" 
                    sh "scp -r ${WORKSPACE}/proto-front episaine@192.168.1.12:${DEPLOY_PATH}"

                    // Rendre le script deploy.sh exécutable et l'exécuter
                    sh "ssh episaine@192.168.1.11 'chmod +x ${DEPLOY_PATH}/deploy.sh && ${DEPLOY_PATH}/deploy.sh'"
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