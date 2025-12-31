pipeline {
    agent any

    environment {
        // Jenkins credentials IDs
        VERCEL_TOKEN = credentials('vercel_token')
        DATABASE_URL = credentials('database_url') // Railway MySQL URL
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/coderzzrohit/shipping-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                  node -v
                  npm -v
                  npm install
                '''
            }
        }

        stage('Prisma Generate') {
            steps {
                sh '''
                  npx prisma generate
                '''
            }
        }

        stage('Prisma Migrate (Production)') {
            steps {
                sh '''
                  npx prisma migrate deploy
                '''
            }
        }

        stage('Build Remix App') {
            steps {
                sh '''
                  npm run build
                '''
            }
        }

        stage('Deploy to Vercel') {
            steps {
                sh '''
                  npm install -g vercel
                  vercel pull --yes --environment=production --token=$VERCEL_TOKEN
                  vercel build --prod --token=$VERCEL_TOKEN
                  vercel deploy --prebuilt --prod --token=$VERCEL_TOKEN
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed!'
        }
    }
}
