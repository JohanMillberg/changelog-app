import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, signIn } from './handlers/user';

const app = express()

const customLogger = (message) => (res, req, next) => {
    console.log(message);
    next();
}

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    console.log("Hello from express");
    res.status(200);
    res.json({ message: "hello" });
})

// Require token for api access
app.use('/api', protect, router)

app.post('/user', createNewUser);
app.post('/signin', signIn);

app.use((err, req, res, next) => {
    console.log(err);
    res.json({ message: 'oops' })
})

export default app;