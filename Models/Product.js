import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		details: {
			type: {
				type: String,
				required: true,
				enum: [
					'espresso',
					'americano',
					'cappuccino',
					'brewed',
					'cold brew',
				],
			},
			origin: { type: String, default: 'Unknown' },
			roastLevel: {
				type: String,
				enum: ['light', 'medium', 'dark'],
				default: 'medium',
			},
			caffeineContent: { type: Number, default: 80 },
			sizes: [
				{
					size: { type: String, enum: ['S', 'M', 'L'], required: true },
					price: { type: Number, required: true },
				},
			],
		},
		extras: [
			{
				type: String,
				enum: ['vanilla', 'caramel', 'whipped cream', 'chocolate drizzle'],
			},
		],
		image: String,
		description: {
			type: String,
			required: true,
			default: '',
		},
		promotion: {
			type: {
				is: { type: Boolean, required: true, default: false },
				value: {
					type: Number,
					min: 1,
					max: 99,
					default: null,
				},
				date: {
					type: {
						start: { type: Date, default: Date.now },
						end: { type: Date },
					},
				},
			},
			default: {},
		},
		created_by: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			default: null,
		},
		availability: { type: Boolean, default: true },
		reviews: {
			type: [
				{
					user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
					rating: { type: Number, min: 1, max: 5, required: true },
					comment: String,
					date: { type: Date, default: Date.now },
				},
			],
			default: [],
		},
	},
	{ timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
