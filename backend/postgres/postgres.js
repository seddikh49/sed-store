import { Sequelize } from 'sequelize'



const sequelize = new Sequelize('ecommerce', 'postgres', 'halflife123', {
  host: 'localhost',
  dialect:  'postgres' 
});


const connect = async() => {
    try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}

export { connect, sequelize }