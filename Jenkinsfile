pipeline {
  agent any

  environment {
    SONAR_INSTANCE = 'sonarqube'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv(SONAR_INSTANCE) {
          sh '''
            if ! command -v curl >/dev/null 2>&1; then
              apt-get update -y && apt-get install -y curl
            fi
            SCANNER_VERSION=5.0.1.3006
            SCANNER_DIR=sonar-scanner-$SCANNER_VERSION-linux
            if [ ! -d "$SCANNER_DIR" ]; then
              curl -sSfL "https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/${SCANNER_DIR}.tar.gz" -o sonar-scanner.tgz
              tar -xzf sonar-scanner.tgz
            fi
            ./${SCANNER_DIR}/bin/sonar-scanner \
              -Dsonar.projectKey=teclado \
              -Dsonar.projectName=Teclado \
              -Dsonar.projectVersion=1.0 \
              -Dsonar.sources=. \
              -Dsonar.sourceEncoding=UTF-8
          '''
        }
      }
    }

    stage('Quality Gate') {
      steps {
        timeout(time: 5, unit: 'MINUTES') {
          waitForQualityGate()
        }
      }
    }
  }
}
