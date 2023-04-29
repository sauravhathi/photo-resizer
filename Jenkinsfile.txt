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
          echo "Application running on http://localhost:3000/"
          dockerImage.run('--name=initial -d -p 3000:80')
        }
      }
    }
  }
}
