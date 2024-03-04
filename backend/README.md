# Backend

Este proyecto maneja [Express](https://expressjs.com/es/)

## Configuración de la Base de Datos

- Instalar [PostgreSQL](https://www.postgresql.org/download/) 
- Instalar [PgAdmin4](https://www.pgadmin.org/download/) 

En caso de ser la primera vez, modificar la contraseña del usuario postgres en la terminal, el mismo que viene por defecto:
- `sudo -i -u postgres`
- `psql`
- `ALTER USER postgres PASSWORD 'postgres';`
- `CREATE DATABASE picoplaca;`

## Instalación
Este proyecto está en base a `node 18.19.1` 

- Escribir `nvm use 18` caso contrario instalarlo y luego usarlo
- `npm install` para instalar dependencias

Verificar el archivo `.env` antes de correr el siguiente comando ya que están los valores de la DB que podrían cambiar como DB_USER o DB_PASSWORD, para este momento debería estar creada la base de datos llamada **picoplaca**:
- `npm run create-db`
- `npm run migrate`

## Ejecutar en local

Ejecutar con `npm run start` para poder levantarlo en local. Esto correrá en `http://localhost:3000/`. 

## Sequelize
Sequelize tiene 3 entornos, pero ahora usaremos el entorno de desarrollo el cual estará en **config/config.json** los valores del mismo son los de la DB que se vaya a crear
