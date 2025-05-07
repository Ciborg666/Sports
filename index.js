import express from 'express';
import session from 'express-session';
import registrationRouter from './src/routes/registrationRouter.js';
import sequelizeDB from './src/db/db.js';

console.log('app.js: Начало выполнения');

import defineAssociations from './src/moduls/associations.js';

import loginRoutes from './src/routes/loginRoutes.js';
import accauntRoutes from './src/routes/accauntRoutes.js';
import cartRoutes from './src/routes/cartRoutes.js';
import cartController from './src/controllers/cartController.js';
import MyTraining from './src/moduls/MyTraining.js';
import TrainingItem from './src/moduls/TrainingItem.js';
import associate from './src/moduls/associationsTrainig.js';
import authRoutes from './src/routes/avtorizRoutes.js';
import indexRoutes from './src/routes/indexRoutes.js';
import timeRoutes from './src/routes/timeRoutes.js';
import servicesRoutes from './src/routes/servicesRoutes.js';
import managerRoutes from './src/routes/manager.js';
import trainingSessionRoutes from './src/routes/trainingSessionRoutes.js';
import enrollmentRoutes from './src/routes/enrollmentRoutes.js';
import { syncDatabaseSchema } from './src/utils/databaseSynch.js';
import seedDatabaseNews from './src/seeders/newsSeed.js';
//import newsRoutes from './src/routes/newsRoutes.js'


associate(); // Вызываем associate после определения моделей

sequelizeDB.sync({ force: false })
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => {
    console.error('Sync error:', err);
  });

const app = express();

app.set('view engine', 'hbs');
app.set('views', './src/views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
    },
}));

// Подключение маршрутов
app.get('/', (req, res) => {
    res.render('registration');
});

app.use('/', registrationRouter);

app.use('/', authRoutes);

app.use('/', managerRoutes);

app.use('/', indexRoutes);

app.use('/', loginRoutes);

app.use('/', timeRoutes);

app.use('/', servicesRoutes);

app.use('/', accauntRoutes);

app.use('/', cartRoutes);

//app.use('/news', newsRoutes);

app.get('/carts', (req, res) => {
    res.render('carts');
});

app.use('/api', trainingSessionRoutes);

app.use('/api', enrollmentRoutes);

// Заполняем базу данных Burgers


const PORT = process.env.PORT || 3000;
const startServer = async () => {
    try {
        await sequelizeDB.authenticate();
        console.log('Подключение к SQLite успешно!');

        //await syncDatabaseSchema();
        //seedDatabaseNews(); 

        defineAssociations(sequelizeDB); // ОПРЕДЕЛЯЕМ СВЯЗИ

        console.log('app.js: Связи определены');

        await sequelizeDB.sync({ force: false });
        

        app.listen(PORT, () => {
            console.log(`Сервер запущен на http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Не удалось подключиться к базе данных:', error);
    }
};

startServer();