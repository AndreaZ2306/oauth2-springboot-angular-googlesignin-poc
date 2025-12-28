pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Clonando repositorio desde SCM'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Ejecutando build del proyecto'
                sh 'echo "Build ejecutado correctamente"'
            }
        }

        stage('Tests') {
            steps {
                echo 'Ejecutando tests automáticos'
                sh 'echo "Tests ejecutados correctamente"'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Despliegue automático (simulado)'
                sh 'echo "Aplicación desplegada correctamente"'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizado'
        }
        success {
            echo 'Pipeline ejecutado con éxito'
        }
        failure {
            echo 'Pipeline fallido'
        }
    }
}
