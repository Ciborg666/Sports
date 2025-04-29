import MyTraining from './MyTraining.js';
import TrainingItem from './TrainingItem.js';

function associate() {
  TrainingItem.belongsTo(MyTraining, {
    foreignKey: 'myTrainingId',
    as: 'myTraining'
  });

  MyTraining.hasMany(TrainingItem, {
    foreignKey: 'myTrainingId',
    as: 'trainingItems',
    onDelete: 'CASCADE'
  });
}

export default associate;