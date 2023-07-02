const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/productModel");
const Theater = require("../models/theaterModel");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("Hello World");
});

// PRODUCTS COLLECTION

// CREATE NEW PRODUCT
app.post("/products", async (req, res) => {
	try {
		const product = await Product.create(req.body);
		res.status(201).json(product);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

// FIND PRODUCT BY ID
app.get("/products/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);
		if (product) {
			res.status(200).json(product);
		}
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

// FIND ALL PRODUCTS
app.get("/products", async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json(products);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

// UPDATE PRODUCT BY ID
app.put("/products/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
		res.status(200).json(product);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

// DELETE PRODUCT BY ID

app.delete("/products/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndDelete(id);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}
		res.status(200).json(product);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

// THEATERS COLLECTION

// FIND ALL THEATERS
app.get("/theaters", async (req, res) => {
	try {
		const theaters = await Theater.find({});
		res.status(200).json(theaters);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

// CREATE NEW THEATER
app.post("/theaters", async (req, res) => {
	try {
		const theater = await Theater.create(req.body);
		res.status(202).json(theater);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

mongoose
	.connect(process.env.REACT_APP_MONGODB_API_KEY)
	.then(() => {
		console.log("connected to database");
		app.listen(3000, () => console.log("listening on port 3000!"));
	})
	.catch(err => {
		console.log(err);
	});
