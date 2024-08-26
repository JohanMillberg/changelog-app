import prisma from '../db';

export const getUpdates = async (req, res, next) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                belongsToId: req.user.id
            },
            include: {
                updates: true
            }
        });

        const updates = products.reduce((allUpdates, product) => {
            return [...allUpdates, ...product.updates]
        }, []);

        res.json({ data: updates });
    } catch (e) {
        next(e);
    }
}

export const getOneUpdate = async (req, res, next) => {
    try {
        const update = await prisma.update.findFirst({
            where: {
                id: req.params.id,
            }
        });

        res.json({ data: update });
    } catch (e) {
        next(e);
    }
}

// Poor choice of model name
export const updateUpdate = async (req, res, next) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                belongsToId: req.user.id
            },
            include: {
                updates: true
            }
        });

        const updates = products.reduce((allUpdates, product) => {
            return [...allUpdates, ...product.updates]
        }, []);

        const match = updates.find(update => update.id === req.params.id);

        if (!match) {
            res.json({
                message: "No update with this id available"
            })
        };

        const updated = await prisma.update.update({
            where: {
                id: req.params.id
            },
            data: req.body
        });

        res.json({ data: updated });
    } catch (e) {
        e.type = 'input';
        next(e);
    }
}

export const createUpdate = async (req, res, next) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: req.body.productId
            }
        });

        if (!product) {
            res.json({ message: "Product does not exist for user" })
        };

        const update = await prisma.update.create({
            data: {
                title: req.body.title,
                body: req.body.body,
                product: { connect: { id: product.id } }
            }
        });

        res.json({ data: update });
    } catch (e) {
        e.type = 'input';
        next(e);
    }
}

export const deleteUpdate = async (req, res, next) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                belongsToId: req.user.id
            },
            include: {
                updates: true
            }
        });

        const updates = products.reduce((allUpdates, product) => {
            return [...allUpdates, ...product.updates]
        }, []);

        const match = updates.find(update => update.id === req.params.id);

        if (!match) {
            res.json({
                message: "No update with this id available"
            })
        };

        const deleted = await prisma.update.delete({
            where: {
                id: req.params.id
            }
        });

        res.json({ data: deleted });
    } catch (e) {
        next(e);
    }
}