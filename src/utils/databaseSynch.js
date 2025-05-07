import sequelizeDB from '../db/db.js'; 

const syncDatabaseSchema = async () => {
  console.log('syncDatabaseSchema: Функция вызвана!');
  try {
    await sequelizeDB.sync({ alter: { drop: false } }); // <<<--- ДОБАВЬТЕ AWAIT!!!
    console.log('syncDatabaseSchema: Таблица News должна быть создана.');
    console.log('Database schema synced successfully.');
  } catch (error) {
    console.error('Error syncing database schema:', error);
    console.error('Detailed error:', error.message);
    console.error('Stack trace:', error.stack);
  }
};

export { syncDatabaseSchema };