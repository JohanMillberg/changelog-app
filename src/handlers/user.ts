import prisma from '../db';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';

export const createNewUser = async (req, res, next) => {
    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password)
            }
        })

        const token = createJWT(user);
        res.json({ token });
    } catch (e) {
        e.type = 'input';
        next(e);
    }
}

export const signIn = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: req.body.username
            }
        })

        const userPassHash = user.password;
        const isValid = await comparePasswords(req.body.password, userPassHash);

        if (!isValid) {
            res.status(401);
            res.json({ message: 'Password incorrect' });
            return;
        }

        const token = createJWT(user);
        res.json({ token });
    } catch (e) {
        e.type = 'auth';
        next(e);
    }
}