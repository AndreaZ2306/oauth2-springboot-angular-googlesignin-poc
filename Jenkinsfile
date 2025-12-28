pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        // Maven local repo dentro del workspace (evita problemas de permisos/cache en CI)
        MAVEN_OPTS = "-Dmaven.repo.local=${WORKSPACE}/.m2/repository"

        // Nombre del stack/compose (útil para identificar servicios/ps/logs)
        COMPOSE_PROJECT_NAME = "oauth2-poc"
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
                    sh 'chmod +x mvnw || true'

                    sh '''
                        set -e
                        if [ -f "./mvnw" ]; then
                          ./mvnw -B clean test package
                        else
                          mvn -B clean test package
                        fi
                    '''

                    echo 'Verificando que se generó el JAR...'
                    sh 'ls -lah target/*.jar'
                }
            }
        }

        stage('Build Frontend (opcional)') {
            when { expression { fileExists('front/package.json') } }
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

        stage('Deploy (CD con Docker Compose)') {
            // Desplegar solo en la rama develop (cámbialo a main si lo necesitas)
            when { branch 'develop' }

            steps {
                echo 'Despliegue automático REAL con Docker Compose'

                sh '''
                    set -e

                    # Validaciones básicas
                    test -f docker-compose.yml || (echo "ERROR: No existe docker-compose.yml en la raíz del repo" && exit 1)
                    test -f resource-server/Dockerfile || (echo "ERROR: No existe resource-server/Dockerfile" && exit 1)
                    test -f resource-server/target/*.jar || (echo "ERROR: No existe JAR en resource-server/target. ¿Falló el build?" && exit 1)

                    echo "Docker version:"
                    docker version

                    echo "Docker Compose version:"
                    docker compose version

                    echo "Bajando stack anterior (si existe)..."
                    docker compose -p "${COMPOSE_PROJECT_NAME}" down || true

                    echo "Construyendo y levantando stack..."
                    docker compose -p "${COMPOSE_PROJECT_NAME}" up -d --build

                    echo "Servicios levantados:"
                    docker compose -p "${COMPOSE_PROJECT_NAME}" ps
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizado'

            // Publicar resultados de tests JUnit
            junit allowEmptyResults: true, testResults: 'resource-server/target/surefire-reports/*.xml'

            // Guardar el .jar del backend si se generó
            archiveArtifacts artifacts: 'resource-server/target/*.jar', allowEmptyArchive: true

            // Guardar reportes JaCoCo si existen
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

