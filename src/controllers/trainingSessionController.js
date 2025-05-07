// controllers/trainingSessionController.js
import TrainingSession from '../moduls/TrainingSession.js'; // Убедитесь, что путь правильный
import User from '../moduls/User.js'; // Убедитесь, что путь правильный
import { Op } from 'sequelize';

// Получение всех занятий на неделю
const getTrainingSessions = async (req, res) => {
  try {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const trainingSessions = await TrainingSession.findAll({
      where: {
        date: {
          [Op.gte]: today,
          [Op.lte]: nextWeek
        }
      },
      include: [{
        model: User,
        as: 'trainer',
        attributes: ['id', 'username', 'email'] // Укажите атрибуты тренера
      }],
      order: [['date', 'ASC'], ['time', 'ASC']] // Сортировка по дате и времени
    });

    // Форматирование даты и времени
    const formattedTrainingSessions = trainingSessions.map(session => ({
      ...session.get({ plain: true }), // Преобразуем в обычный объект
      date: session.date ? new Date(session.date).toLocaleDateString('ru-RU') : null, // Форматируем дату
      time: session.time ? session.time.slice(0, 5) : null // Извлекаем часы и минуты из времени
    }));

    res.json(formattedTrainingSessions);
  } catch (error) {
    console.error('Ошибка при получении занятий:', error);
    res.status(500).send('Ошибка при получении занятий');
  }
};
// Создание нового занятия (только для менеджеров)
const createTrainingSession = async (req, res) => {
  try {
    const { name, description, date, time } = req.body;

    const newTrainingSession = await TrainingSession.create({
      name,
      description,
      date,
      time,
    });

    res.status(200).json({ message: "Занятие создано" }); // Отправляем код 200 и сообщение

  } catch (error) {
    console.error('Ошибка при создании занятия:', error);
    res.status(500).json({ message: 'Ошибка при создании занятия' }); //  Отправляем JSON с сообщением об ошибке
  }
};

// Получение информации об одном занятии по ID
const getTrainingSession = async (req, res) => {
try {
  const { id } = req.params;
  const trainingSession = await TrainingSession.findByPk(id); // Удалили include, чтобы не было зависимости от модели User

  if (!trainingSession) {
    return res.status(404).send('Занятие не найдено');
  }

  res.json(trainingSession);
} catch (error) {
  console.error('Ошибка при получении занятия:', error);
  res.status(500).send('Ошибка при получении занятия');
}
};

// Обновление занятия (только для менеджеров)
const updateTrainingSession = async (req, res) => {
try {
  const { id } = req.params;
  const { name, description, date, time } = req.body;

  const trainingSession = await TrainingSession.findByPk(id);

  if (!trainingSession) {
    return res.status(404).send('Занятие не найдено');
  }

  // TODO: Проверка прав доступа (только для менеджеров)

  await trainingSession.update({
    name, description, date, time
  });

  res.json(trainingSession);
} catch (error) {
  console.error('Ошибка при обновлении занятия:', error);
  res.status(500).send('Ошибка при обновлении занятия');
}
};

// Удаление занятия (только для менеджеров)
const deleteTrainingSession = async (req, res) => {
try {
  const { id } = req.params;

  const trainingSession = await TrainingSession.findByPk(id);

  if (!trainingSession) {
    return res.status(404).send('Занятие не найдено');
  }

  // TODO: Проверка прав доступа (только для менеджеров)

  await trainingSession.destroy({ where: { id: id } });

  res.status(204).send(); // Успешное удаление, нет контента для ответа
} catch (error) {
  console.error('Ошибка при удалении занятия:', error);
  res.status(500).send('Ошибка при удалении занятия');
}
};

export { getTrainingSessions, createTrainingSession, getTrainingSession, updateTrainingSession, deleteTrainingSession };