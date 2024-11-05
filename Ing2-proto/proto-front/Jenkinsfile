pipeline {
    agent { label 'vm-agent' }
    stages {
        stage('Build') {
            steps {
                sh 'mvn clean install'
            }
        }
        stage('Deploy') {
            steps {
                sshagent(['3a44a20d-43e5-41f9-a16f-74d779917e1c']) {
                    sh 'scp target/mon-projet.war episaine@172.31.250.244:/home/episaine/Jenkins'
                    sh 'ssh episaine@172.31.250.244 "systemctl restart mon-service"'
                }
            }
        }
    }
}
