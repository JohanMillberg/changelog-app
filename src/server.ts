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
    res.status(200);
    res.json({ message: "hello" });
})

// Require token for api access
app.use('/api', protect, router)

app.post('/user', createNewUser);
app.post('/signin', signIn);

app.use((err, req, res, next) => {
    if (err.type === 'auth') {
        res.status(401).json({ message: 'unauthorized' });
    } else if (err.type === 'input') {
        res.status(400).json({ message: 'invalid input' });
    } else {
        res.status(500).json({ message: "that shouldn't happen" })
    }
})

export default app;