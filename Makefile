docker-compose-build: 
	docker-compose build

docker-compose-up-build: 
	docker-compose up -d --build

docker-compose-up: 
	docker-compose up -d

docker-compose-down: 
	docker-compose down

docker-compose-migrations:
	docker-compose exec backend php artisan migrate --force

docker-compose-seed:
	docker-compose exec backend php artisan db:seed --force

docker-compose-logs:
	docker-compose logs -f
