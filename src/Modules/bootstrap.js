import userRouter from './Auth/user.routes.js';
export const bootstrap = (app) => {
    app.use('/api/auth', userRouter);
}