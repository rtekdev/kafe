import express from 'express';
import { PORT, URL } from './config.js';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js'
import cors from 'cors'
import userRouter from './routes/users.js';

const app = express();
mongoose
	.connect(URL)
	.catch((err) => console.error('Error while connecting with database'));

app.use(express.json());
app.use(cors())

app.use(authRoutes);

app.use('/api/products', productRoutes)

app.use('/api/users', userRouter)

app.use((error, req, res, next) => {
	const status = error.status || 500;
	const message = error.message || 'Something went wrong.';
	res.status(status).json({ message: message });
});

app.listen(PORT, () => console.log(`Server is working at PORT: ${PORT}`));
