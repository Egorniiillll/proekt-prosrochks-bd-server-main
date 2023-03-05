const { BIGINT } = require("sequelize");
const Sequelize = require("sequelize")
const config = require("./config.json")
const sequelize = new Sequelize(config.database, config.user, config.password, {
    dialect: 'postgres',
    host: config.host
})
const Main = sequelize.define("Main", {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    article: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    manufacture_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    expiry_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    arrival_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    product_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    count: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    creator_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
});
// const Storage = sequelize.define("Storage", {
//     id: {
//         type: Sequelize.BIGINT,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     section: {
//         type: Sequelize.BIGINT,
//         allowNull: false
//     },
//     shelf: {
//         type: Sequelize.BIGINT,
//         allowNull: false
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     counterer: {
//         type: Sequelize.BIGINT,
//         allowNull: false
//     },
// })
// const Shop = sequelize.define("Shop", {
//     id: {
//         type: Sequelize.BIGINT,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     section: {
//         type: Sequelize.BIGINT,
//         allowNull: false
//     },
//     shelf: {
//         type: Sequelize.BIGINT,
//         allowNull: false
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     counterer: {
//         type: Sequelize.BIGINT,
//         allowNull: false
//     },
// });

const requests = sequelize.define("requests", {
    product:{
        type: Array,
        allowNull: false
    },
    request_date: {
        type: Date,
        allowNull: false
    },
    status:{
        type: BIGINT,
        allowNull: false
    },
    sender:{
        type: String,
        allowNull: false
    }
});
//файл
const product_types = sequelize.define("product_types", { 
    type:{
        type:String,
        allowNull: false
    }
    value:{
        type: BIGINT
    }

});

//sequelize.sync({force:true})
module.exports={
    Main, Storage, Shop, sequelize, Sequelize,history_requests
}
