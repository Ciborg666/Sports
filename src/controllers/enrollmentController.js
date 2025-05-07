// controllers/enrollmentController.js
import Enrollment from '../moduls/Enrollment.js'; // Убедитесь, что путь правильный
import TrainingSession from '../moduls/TrainingSession.js'; // Убедитесь, что путь правильный
import User from '../moduls/User.js'; // Убедитесь, что путь правильный

// Запись пользователя на занятие
const enrollUser = async (req, res) => {
    try {
        const { userId, trainingSessionId } = req.body;

        // Проверяем, есть ли места на занятии
        const trainingSession = await TrainingSession.findByPk(trainingSessionId);
        if (!trainingSession) {
            return res.status(404).send('Занятие не найдено');
        }

        // Проверяем, сколько пользователей уже записано на занятие
        const enrolledCount = await Enrollment.count({
            where: {
                trainingSessionId: trainingSessionId
            }
        });

        if (enrolledCount >= trainingSession.maxParticipants) {
            return res.status(400).send('Нет мест на занятии');
        }

        // Проверяем, не записан ли уже пользователь на это занятие
        const existingEnrollment = await Enrollment.findOne({
            where: {
                userId: userId,
                trainingSessionId: trainingSessionId
            }
        });

        if (existingEnrollment) {
            return res.status(400).send('Вы уже записаны на это занятие');
        }

        // Записываем пользователя на занятие
        const newEnrollment = await Enrollment.create({
            userId: userId,
            trainingSessionId: trainingSessionId
        });

        res.status(201).json(newEnrollment);
    } catch (error) {
        console.error('Ошибка при записи на занятие:', error);
        res.status(500).send('Ошибка при записи на занятие');
    }
};

// Отмена записи пользователя на занятие
const unenrollUser = async (req, res) => {
    try {
        const { userId, trainingSessionId } = req.body;

        // Удаляем запись пользователя на занятие
        const deletedEnrollment = await Enrollment.destroy({
            where: {
                userId: userId,
                trainingSessionId: trainingSessionId
            }
        });

        if (deletedEnrollment === 0) {
            return res.status(404).send('Запись не найдена');
        }

        res.status(200).send('Запись отменена');
    } catch (error) {
        console.error('Ошибка при отмене записи:', error);
        res.status(500).send('Ошибка при отмене записи');
    }
};

// Получение списка занятий, на которые записан пользователь
const getEnrollmentsForUser = async (req, res) => {
  try {
    const { userId } = req.params; // Получаем ID пользователя из параметров запроса

    // Ищем все записи о записях для данного пользователя
    const enrollments = await Enrollment.findAll({
      where: { userId: userId },
      include: [
        {
          model: TrainingSession,
          as: 'trainingSession',  // Указываем alias для связи
          include: [{ model: User, as: 'trainer' }] // Получаем информацию о тренере
        }
      ]
    });

    res.json(enrollments);
  } catch (error) {
    console.error('Ошибка при получении записей для пользователя:', error);
    res.status(500).send('Ошибка при получении записей для пользователя');
  }
};

export { enrollUser, unenrollUser, getEnrollmentsForUser };