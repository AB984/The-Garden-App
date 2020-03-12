const  Sequelize  = require('sequelize');

const sequelize = new Sequelize('gardeningapp', 'postgres', 'Letmein1234!', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to gardeningapp postgres database');
    },
    function(err){
        console.log(err);
    }
);



module.exports = sequelize;
