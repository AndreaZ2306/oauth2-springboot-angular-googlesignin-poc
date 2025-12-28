pipeline {
    agent any

    options {
        timestamps()
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Clonando repositorio desde SCM'
                checkout scm
            }
        }

        stage('Build Backend (resource-server)') {
            steps {
                echo 'Compilando backend con Maven en resource-server'
                dir('resource-server') {
                    // Por si el proyecto tuviera Maven Wrapper (mvnw)
                    sh 'chmod +x mvnw || true'

                    // Si existe mvnw lo usa; si no, usa mvn del sistema
                    sh '''
                        if [ -f "./mvnw" ]; then
                          ./mvnw -B clean compile
                        else
                          mvn -B clean compile
                        fi
                    '''
                }
            }
        }

        stage('Tests Backend (resource-server)') {
            steps {
                echo 'Ejecutando tests del backend (resource-server)'
                dir('resource-server') {
                    sh '''
                        if [ -f "./mvnw" ]; then
                          ./mvnw -B test
                        else
                          mvn -B test
                        fi
                    '''
                }
            }
        }

        stage('Deploy (simulado)') {
            steps {
                echo 'Despliegue automático (simulado)'
                sh 'echo "Aplicación desplegada correctamente (simulado)"'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizado'

            // Guardar resultados de tests (si existen)
            dir('resource-server') {
                junit allowEmptyResults: true, testResults: 'target/surefire-reports/*.xml'
            }

            // Guardar artefacto .jar si se generó en algún paso (por si luego cambias a package)
            archiveArtifacts artifacts: 'resource-server/target/*.jar', allowEmptyArchive: true

            // Guardar reportes de JaCoCo si se generaron
            archiveArtifacts artifacts: 'resource-server/target/site/jacoco/**', allowEmptyArchive: true
        }

        success {
            echo 'Pipeline ejecutado con éxito'
        }

        failure {
            echo 'Pipeline fallido'
        }
    }
}
