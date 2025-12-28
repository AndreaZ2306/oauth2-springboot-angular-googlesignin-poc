pipeline {
    agent any

    options {
        timestamps()
    }

    environment {
        // Evita problemas típicos de Maven en CI
        MAVEN_OPTS = "-Dmaven.repo.local=.m2/repository"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Clonando repositorio desde SCM'
                checkout scm
            }
        }

        stage('Build + Tests Backend (resource-server)') {
            steps {
                echo 'Build + tests del backend con Maven (resource-server)'

                dir('resource-server') {

                    // Asegura permisos del wrapper si existe
                    sh 'chmod +x mvnw || true'

                    // Build real + tests (incluye generación de reportes)
                    sh '''
                        set -e
                        if [ -f "./mvnw" ]; then
                          ./mvnw -B clean test package
                        else
                          mvn -B clean test package
                        fi
                    '''
                }
            }
        }

        // ---- OPCIONAL: FRONTEND (si existe carpeta y package.json) ----
        stage('Build Frontend (opcional)') {
            when {
                expression { fileExists('front/package.json') }
            }
            steps {
                echo 'Build frontend Angular (opcional)'

                dir('front') {
                    sh '''
                        set -e
                        npm ci
                        npm run build
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

            // 1) Publicar resultados de tests JUnit (backend)
            junit allowEmptyResults: true, testResults: 'resource-server/target/surefire-reports/*.xml'

            // 2) Guardar el .jar del backend si se generó
            archiveArtifacts artifacts: 'resource-server/target/*.jar', allowEmptyArchive: true

            // 3) Guardar reportes JaCoCo si existen (los genera tu pom con jacoco-maven-plugin)
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
