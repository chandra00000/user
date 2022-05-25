const dbConfig = require('../configs/db');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        // logging: false,
        operatorsAliases: false,

        dialect: dbConfig.dialect,
        operatorsAliases: false,
        // pool: {
        //     max: dbConfig.pool.max,
        //     min: dbConfig.pool.min,
        //     acquire: dbConfig.pool.acquire,
        //     idle: dbConfig.pool.idle
        // }
    }
)

sequelize.authenticate()
    .then(() => {
        console.log('connected..')
    })
    .catch(err => {
        console.log('Error' + err)
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize



//db table name
db.users = require('./user.model')(sequelize, DataTypes)
db.states = require('./state.model')(sequelize, DataTypes)
db.cities = require('./city.model')(sequelize, DataTypes)
db.roles = require('./role')(sequelize, DataTypes)


db.sequelize.sync({ force: false })

.then(() => {
    console.log('yes re-sync done!')
}).catch(err => {
    console.log('something want wrong')
})


//one to one Relation for users to city
// db.cities.hasOne(db.users, { foreignKey: 'city_id' });
// db.users.belongsTo(db.cities, { foreignKey: 'city_id' });

// one to one Relation for users to city
// db.users.belongsTo(db.city, {
//     foreignKey: 'state_id',
//     as: 'state'
// })
// db.states.hasMany(db.cities, {
//         as: 'citie'
//     })
// one to Many Relation for cities to states
// db.cities.belongsTo(db.states, {
//     foreignKey: 'state_id',
//     // as: 'state'
// })
// db.states.hasMany(db.cities, {
//     foreignKey: 'id',
//     // as: 'citie'
// })
db.states.belongsTo(db.users, {
    foreignKey: 'state_id'
})
db.users.hasOne(db.states, {
    foreignKey: 'state_id'
})

// db.roles.belongsTo(db.users, {
//     foreignKey: 'role_id',

// })
// db.users.hasOne(db.roles, {
//         foreignKey: 'role_id',

//     })
// END.............one to Many Relation for cities to states
module.exports = db