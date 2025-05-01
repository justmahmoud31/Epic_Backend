import userRouter from './Auth/user.routes.js';
import categoryRouter from './Category/category.routes.js';
import productRouter from './Products/product.routes.js';
export const bootstrap = (app) => {
    app.use('/api/auth', userRouter);
    app.use('/api/categories', categoryRouter);
    app.use('/api/products', productRouter);
}