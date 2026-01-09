#!/bin/bash

echo "🚀 Setting up User Management System..."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is installed
if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
    echo -e "${GREEN}✓${NC} Docker and Docker Compose found"
    echo ""
    read -p "Do you want to use Docker? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🐳 Setting up with Docker..."
        docker-compose up -d
        echo ""
        echo -e "${GREEN}✓${NC} Docker containers started"
        echo ""
        echo "Waiting for services to be ready..."
        sleep 10
        
        echo "Running migrations..."
        docker-compose exec backend php artisan migrate --force
        
        read -p "Do you want to seed the database? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            docker-compose exec backend php artisan db:seed --force
        fi
        
        echo ""
        echo -e "${GREEN}✓${NC} Setup complete!"
        echo ""
        echo "Services are running:"
        echo "  - Backend API: http://localhost:8000"
        echo "  - Frontend: http://localhost:3000"
        echo "  - PostgreSQL: localhost:5432"
        echo ""
        echo "Default credentials:"
        echo "  - Admin: admin@example.com / password"
        echo "  - User: user@example.com / password"
        exit 0
    fi
fi

# Manual setup
echo "📦 Setting up manually..."
echo ""

# Check requirements
echo "Checking requirements..."

# Check PHP
if ! command -v php &> /dev/null; then
    echo -e "${RED}✗${NC} PHP is not installed"
    exit 1
fi
echo -e "${GREEN}✓${NC} PHP $(php -v | head -n 1 | cut -d ' ' -f 2)"

# Check Composer
if ! command -v composer &> /dev/null; then
    echo -e "${RED}✗${NC} Composer is not installed"
    exit 1
fi
echo -e "${GREEN}✓${NC} Composer $(composer --version | cut -d ' ' -f 3)"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗${NC} Node.js is not installed"
    exit 1
fi
echo -e "${GREEN}✓${NC} Node.js $(node -v)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗${NC} npm is not installed"
    exit 1
fi
echo -e "${GREEN}✓${NC} npm $(npm -v)"

echo ""
echo "Setting up backend..."
cd backend

# Check if .env exists
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi

# Install dependencies
echo "Installing PHP dependencies..."
composer install --no-interaction --prefer-dist --optimize-autoloader

# Generate key
echo "Generating application key..."
php artisan key:generate --ansi

# Create storage directories
echo "Creating storage directories..."
mkdir -p storage/framework/{sessions,views,cache}
mkdir -p storage/logs
mkdir -p bootstrap/cache

# Set permissions
echo "Setting permissions..."
chmod -R 775 storage bootstrap/cache

echo ""
echo -e "${YELLOW}⚠${NC}  Please configure your database in backend/.env"
echo ""
read -p "Press enter when database is configured..."

# Run migrations
echo "Running migrations..."
php artisan migrate --force

# Seed database
read -p "Do you want to seed the database? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    php artisan db:seed --force
fi

cd ..

echo ""
echo "Setting up frontend..."
cd frontend

# Install dependencies
echo "Installing npm dependencies..."
npm install

cd ..

echo ""
echo -e "${GREEN}✓${NC} Setup complete!"
echo ""
echo "To start the application:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend"
echo "  php artisan serve"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd frontend"
echo "  npm start"
echo ""
echo "Then visit:"
echo "  - Backend API: http://localhost:8000"
echo "  - Frontend: http://localhost:3000"
echo ""
echo "Default credentials:"
echo "  - Admin: admin@example.com / password"
echo "  - User: user@example.com / password"

