import prisma from '../../../../lib/prisma';

export default async function handle(req, res) {
    await prisma.review.create({
        data: {
            name: req.body.name,
            text: req.body.text,
            stars: req.body.stars,
            book: {connect: {id: req.body.bookId}},
        }
    }).then(() => {
        return prisma.book.findUnique({
            where: {id: req.body.bookId}
        })
    }).then((book) => {
        return prisma.book.update({
                where: {id: req.body.bookId},
                data: {
                    averageRating: (book.averageRating * book.totalRates + req.body.stars) / (book.totalRates + 1),
                    totalRates: {
                        increment: 1
                    }
                }
            })
        });
    res.json({success: true})
}
