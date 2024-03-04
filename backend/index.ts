import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/database/sequelize';
import cors from 'cors';
import router from './src/routes/router';

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use((req, res, next) => {
    console.log(`Solicitud recibida: ${req.method} ${req.url}`);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        process.exit(1);
    }
})();

app.get('/', (req, res) => {
    res.send('Express.js corriendo y conexión a la base de datos establecida');
});

app.use(cors({ origin: 'http://localhost:4200' }));

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
