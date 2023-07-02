import "./App.css";
import { useEffect, useState, useReducer } from "react";
import { reducer, INITIAL_STATE } from "./reducer/reducer";
import * as Action from "./reducer/actions";
import axios from "axios";

function App() {
	const [products, setProducts] = useState([]);
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	useEffect(() => {
		fetch("http://localhost:3000/products")
			.then(res => {
				console.log(res);
				return res.json();
			})
			.then(data => setProducts(data))
			.catch(err => console.error(err));
		return () => {
			console.log("cleanup");
			setProducts([]);
		};
	}, []);

	useEffect(() => {
		console.log({ state });
	}, [state]);

	const handleSubmit = async e => {
		e.preventDefault();
		const { id, name, price, quantity } = state;

		const updatedFields = {
			...(name && { name }),
			...(price && { price }),
			...(quantity && { quantity }),
		};
		if (!id) {
			return;
		}

		try {
			const response = await axios.put(`http://localhost:3000/products/${id}`, updatedFields);
			const updatedProduct = response.data;
			// update the state with the updated product
			setProducts(prevProducts => prevProducts.map(product => (product._id === updatedProduct._id ? updatedProduct : product)));
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="App">
			{products.map(product => (
				<div key={product._id}>
					<p>Product ID : {product._id}</p>
					<p>Product Name : {product.name}</p>
					<p>Product Price : {product.price}</p>
					<p>Product Quantity: {product.quantity}</p>
					<p>Updated At : {product.updatedAt}</p>
				</div>
			))}

			<form onSubmit={handleSubmit}>
				<p>Product ID</p>
				<input type="text" name="id" onChange={e => Action.handleChange(dispatch, e)} />
				<p>Update Product Name</p>
				<input type="text" name="name" onChange={e => Action.handleChange(dispatch, e)} />
				<p>Update Product price</p>
				<input type="text" name="price" onChange={e => Action.handleChange(dispatch, e)} />
				<p>Update Product Quantity</p>
				<input type="text" name="quantity" onChange={e => Action.handleChange(dispatch, e)} />
				<br />
				<button type="submit">Submit Changes</button>
			</form>
		</div>
	);
}

export default App;
