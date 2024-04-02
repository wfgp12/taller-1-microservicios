const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const sequelize = require('./config/database');
const User = require('./models/users')

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

const userRouter = require('./routes/userRoutes');
app.use('/api/user', userRouter);

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log('Servidor iniciado en el Puerto ', PORT);
        })
    })
    .catch((err) => {
        console.error('Error al sincronizar el modelo', err);
    })