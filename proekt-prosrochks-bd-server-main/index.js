const express = require("express");
const db = require("./function.js")
const port_const = 3000;
const app = express();
const cors = require('cors');
app.use(cors({
    origin: '*'
}));


//req.body.[param]; - for any json data (req.body - json)

// function sub_abs(a, b) {
// 	return abs(a - b)
// }


function is_data_defined(data) {
	return data !== undefined;
}

function all_data_recieved(data) {
	let state = true;
	for (prop in data) {
		let tmp = is_data_defined(prop);
		state = state && tmp;				//if any data undefined -> state=false
	}
	return state;
}

function any_data_recieved(data) {
	let state = false;
	for (prop in data) {
		let tmp = is_data_defined(prop);
		state = state || tmp;
	}
	return state;
}

async function get_filtered_items(data) {
	let res;
	switch (data) {
		case data.name !== undefined:
			res = await db.filter_by_name(data.name)
			break;
		case data.article !== undefined:
			res = await db.filter_by_article(data.article)
			break;
		case data.data_creating !== undefined:
			res = await db.filter_by_data_creating(data.data_creating)
			break;
		case data.expiration_date !== undefined:
			res = await db.filter_by_expiration_date(data.expiration_date)
			break;
		case data.data_shop:
			res = await db.filter_by_data_shop(data.data_shop)

	}
	return res
}

function get_json_data(req) {
	let data = {};
	data.id = req.body.id;

	data.main.name = req.body.main.name;
	data.main.article = req.body.main.name;
	data.main.data_creating = req.body.main.data_creating;
	data.main.expiration_date = req.body.main.expiration_date;
	data.main.data_shop = req.body.main.data_shop;

	data.placement.name = req.body.shop.name;
	data.placement.section = req.body.shop.section;
	data.placement.shelf = req.body.shop.shelf;

	data.storage.name = req.body.storage.name;
	data.storage.section = req.body.storage.section;
	data.storage.shelf = req.body.storage.shelf;
	return data;
}

app.get("/", (req, res) => {
	res.send({ DEBUG: "root, no any practical-sense here" });
});

//when product sold, send request to the server (update product data)
app.post("/delete_product", async (req, res) => {
	let data = get_json_data(req);
	if (all_data_recieved(data)) {
		await db.delete_product(data.name, data.article,
			data.data_creating, data.expiration_date)
		res.send({ req: 0 });	//all ended successfully
	}
});

//new product type creating
app.post("/add_product", async (req, res) => {
	let data = get_json_data(req);
	if (all_data_received(data)) {
		await db.add_product(data.name, data.article,
			data.data_creating, data.expiration_date)
		res.send({ req: 0 });	//all ended successfully
	}
});

//get any data by filter (is date expired)
app.post("/filter_products", async (req, res) => {
	data = get_json_data(req);
	if (any_data_recieved(data)) {
		let results = await get_filtered_items(data)
		res.send(results);
	}
});

//get all products
app.post("/get_all_products", async (req, res) => {
	let results = await db.get_products()
	console.log("ababba")
	res.send({results});

});
//input_history_request
app.post("/input_history_request", async (req, res) => {
	let results = await db.input_history_requests()
	console.log("ababba")
	res.send({results});

});

app.post("/button_arriwe_products", async (req, res) => {
	db.button_arriwe_products()

});

app.post("/button_reject_products", async (req, res) => {
	db.button_reject_products()

});



// app.post("/button_mains_products", async (req, res) => {
// 	db.button_reject_products()

// });
//listening on port, main server
app.listen(port_const, () => {
	console.log("port " + port_const + " active");
})


