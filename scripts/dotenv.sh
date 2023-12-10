#!/bin/bash
compose_content=$(cat ./docker-compose.yml)

postgres_user=$(echo "$compose_content" | grep -oP 'POSTGRES_USER: \K(.+)')
postgres_password=$(echo "$compose_content" | grep -oP 'POSTGRES_PASSWORD: \K(.+)')
postgres_db=$(echo "$compose_content" | grep -oP 'POSTGRES_DB: \K(.+)')

env_sample_content=$(cat util/.env.sample)

replaced_content=$(echo "$env_sample_content" | sed "s/{POSTGRES_USER}/$postgres_user/g; s/{POSTGRES_PASSWORD}/$postgres_password/g; s/{POSTGRES_DB}/$postgres_db/g")

echo "$replaced_content" > .env

echo "Le fichier .env a été généré avec succès à la racine du projet."
