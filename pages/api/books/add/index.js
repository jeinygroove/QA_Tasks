import prisma from '../../../../lib/prisma';

export default async function handle(req, res) {
    const book = await prisma.book.create({
        data: {
            title: req.body.title,
            cover: req.body.coverFileName,
            description: req.body.description,
            descriptionLong: req.body.descriptionLong,
        }
    })
    res.json({id: book.id})
}
