const mongoose = require("mongoose");

const theatersSchema = new mongoose.Schema(
	{
		theaterId: {
			type: Number,
			required: [true, "Theater id is required"],
		},
		location: {
			type: Object,
			address: {
				type: Object,
				required: [true, "Theater location is required"],
			},
			geo: {
				type: Object,
				required: [true, "Theater type is required"],
				coordinates: {
					type: Array,
					required: [true, "Theater coordinates is required"],
				},
			},
			required: [true, "Theater location is required"],
			default: 1,
		},
	},
	{
		timestamps: true,
	}
);

// first parameter will be the collection name
const Theater = mongoose.model("theaters", theatersSchema);

module.exports = Theater;
