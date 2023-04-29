pipeline {
  agent any
  
  environment {
    dockerImage = ''
    registry = 'sauravh/photo-resizer'
    registryCredential = 'docker-sauravh'
  }
  stages {
    stage('docker build') {
      steps {
        script {
          dockerImage = docker.build registry
        }
      }
    }
    stage ('push image') {
      steps {
        script {
          docker.withRegistry('', registryCredential) {
          dockerImage.push()
          }
        }
      }
    }
    stage('docker run') {
      steps {
        script {
          echo "Project running on http://localhost:3000/"
          dockerImage.run(' -d -p 3000:80')
        }
      }
    }
  }
}
