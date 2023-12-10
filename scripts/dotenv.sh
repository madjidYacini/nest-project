#!/bin/bash

compose_content=$(cat ./docker-compose.yml)

postgres_user=$(echo "$compose_content" | grep -oP 'POSTGRES_USER: \K(.+)')
postgres_password=$(echo "$compose_content" | grep -oP 'POSTGRES_PASSWORD: \K(.+)')
postgres_db=$(echo "$compose_content" | grep -oP 'POSTGRES_DB: \K(.+)')

env_sample_content=$(cat util/.env.sample)

variables=$(grep -oP '{\w+}' util/.env.sample | sed 's/{\|}//g')

replaced_content="$env_sample_content"
for variable in $variables; do
    value=$(eval "echo \$$variable")
    replaced_content=$(echo "$replaced_content" | sed "s/{$variable}/$value/g")
done

echo "$replaced_content" > .env


echo "Le fichier .env.production a été généré avec succès à la racine du projet."
