pipeline {
    agent any

    stages {

        stage('Build') {
            steps {
                echo 'Installing project dependencies...'
                bat 'npm ci'

                echo 'Building Task Manager application...'
                bat 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'Running automated tests...'
                bat 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running ESLint code quality checks...'
                bat 'npm run lint'
            }
        }

        stage('Security') {
            steps {
                echo 'Running security audit...'
                bat 'npm audit --audit-level=high'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying build artefact...'
                bat 'if not exist deployment mkdir deployment'
                bat 'copy /Y build\\TaskManager-build.zip deployment\\TaskManager-build.zip'
            }
        }

        stage('Release') {
            steps {
                echo 'Publishing release artefact...'
                archiveArtifacts artifacts: 'build/TaskManager-build.zip', fingerprint: true
            }
        }
    }
}