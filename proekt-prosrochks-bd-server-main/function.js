const consts=require("./consts.js")




const { Model } = require("sequelize")


const db = require("./db.js")


async function add_product(name, article, data_creating, expiration_date) {
    // обращ к бд, на добав товара 
    return await db.Main.create({
        name: name,
        article: article,
        data_creating: data_creating,
        expiration_date: expiration_date,
        data_shop: new Date()


    })

}

async function delete_product(name, article, data_creating, expiration_date) {
    // обращ к бд на удал товара
    let data = await db.Main.findAll({
        where: {
            name: name,
            article: article,
            data_creating: {
                [db.Sequelize.Op.lte]: data_creating
            },
            expiration_date: {
                [db.Sequelize.Op.lte]: expiration_date
            },
        }, raw: true
    })

    if (data[0] === undefined) { return }
    let id = data[0].id

    db.Main.destroy({
        where: {
            id: id
        }
    })
    db.Storage.destroy({
        where: { id: id }
    })

    db.Shop.destroy({
        where:  { id: id }
    })

}






async function filter_product(data) {
    // поиск по фильтрам


}





const filter_by_name = async (name) => {
    return await db.Main.findAll({ where: { name: name }, raw: true })

}

const filter_by_article = async (article) => {
    return await db.Main.findAll({ where: { article: article }, raw: true })

}

const filter_by_data_creating = async (date_creating) => {
    return await db.Main.findAll({
        where: {
            data_creating: {
                [db.Sequelize.Op.lte]: date_creating
            }
        }, raw: true
    })

}

const filter_by_expiration_date = async (date_expire) => {
    return await db.Main.findAll({
        where: {
            expiration_date: {
                [db.Sequelize.Op.lte]: date_expire
            }
        }, raw: true
    })

}

const filter_by_data_shop = async (data_shop) => {
    return await db.Main.findAll({
        where: {
            data_shop: {
                [db.Sequelize.Op.lte]: data_shop
            }
        }, raw: true
    })

}


const filter_by_id = async (id) => {
    return await Main.findAll({where:{id: id}, raw: true })
    
}

async function get_products() {
    return await db.Main.findAll({
        attributes: ["id", "name", "data_creating",
                                    "expiration_date", "counterer",],
        raw: true
    })
}

async function input_history_requests(){
    return await db.history_requests.findAll({
        raw: true,
        where:{
            rejected:0
        }
    }
    )
}

// async function button_arriwe_products(){
//      await db.history_requests.update({
//         rejected: consts.STATE_VERIFIED
//     },{where:{rejected:0}});
//    //console.log(25, consts)
//    //button_mains_products()
// }


// async function button_mains_products(){
//     console.log(25)
//     await db.Main.update({
//        name:name,
//        article:article,
//        data_creating: date_creating,
//        expiration_date: date_expire,
//        data_shop:request_data,
//        counterer: counterer


//    },{where:{rejected:3}})
// }

// async function button_reject_products(){
//     return await db.history_requests.update({
//         rejected: consts.STATE_REJECTED
//     },{where:{rejected:0}})
// }



module.exports = {
    add_product, delete_product, get_products,
    filter_by_name, filter_by_article,
    filter_by_data_creating, filter_by_expiration_date,
    filter_by_data_shop, filter_by_id, input_history_requests,
    // button_arriwe_products,  button_reject_products,
    

}

