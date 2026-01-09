#!/bin/bash

echo "🚀 Setting up User Management API Backend..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
fi

# Install dependencies
echo "📦 Installing dependencies..."
composer install --no-interaction --prefer-dist --optimize-autoloader

# Generate application key
echo "🔑 Generating application key..."
php artisan key:generate --ansi

# Create storage directories
echo "📁 Creating storage directories..."
mkdir -p storage/framework/{sessions,views,cache}
mkdir -p storage/logs
mkdir -p bootstrap/cache

# Set permissions
echo "🔒 Setting permissions..."
chmod -R 775 storage bootstrap/cache

# Run migrations
echo "🗄️  Running migrations..."
php artisan migrate --force

# Seed database (optional)
read -p "Do you want to seed the database with test data? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding database..."
    php artisan db:seed
fi

echo "✅ Setup complete!"
echo ""
echo "To start the server, run:"
echo "  php artisan serve"
echo ""
echo "Default credentials:"
echo "  Admin: admin@example.com / password"
echo "  User: user@example.com / password"

