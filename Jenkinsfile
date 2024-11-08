pipeline {
    agent { label 'Back_Test' } // Exécute le pipeline sur le nœud réservé "Back_Test"
    
    environment {
        REPO_URL = 'https://github.com/<utilisateur>/<dépôt>.git' // Remplacez par l'URL de votre dépôt
        DEPLOY_PATH = '/home/episaine/jenkins' // Chemin cible sur la VM
    }

    stages {
        stage('Cloner le dépôt') {
            steps {
                // Utilise les identifiants GitHub configurés dans Jenkins
                git url: "${REPO_URL}", branch: 'main', credentialsId: 'github-credentials-id'
            }
        }

        stage('Build') {
            steps {
                echo 'Build en cours...'
                // Ajoutez ici les commandes spécifiques pour compiler ou préparer votre application
                // Exemple : sh 'mvn clean install' pour un projet Java avec Maven
            }
        }

        stage('Déploiement') {
            steps {
                // Utilise les identifiants SSH pour copier les fichiers sur la VM
                sshagent(credentials: ['episaine']) {
                    // Copie les fichiers du workspace Jenkins vers le répertoire de déploiement sur la VM
                    sh "scp -r ${WORKSPACE}/* episaine@192.168.1.11:${DEPLOY_PATH}" 
                    
                    // Rendre le script deploy.sh exécutable et l'exécuter
                    sh "ssh episaine@192.168.1.11 'chmod +x ${DEPLOY_PATH}/deploy.sh && ${DEPLOY_PATH}/deploy.sh'" 
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