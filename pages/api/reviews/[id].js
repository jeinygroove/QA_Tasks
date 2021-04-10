import prisma from '../../../lib/prisma'

// GET /api/reviews/:id
export default async function handle(req, res) {
    const bookId = req.query.id;
    if (req.method === "GET") {
        try {
            const reviews = await prisma.review.findMany({
                where: {bookId: Number(bookId)},
            })
            res.json(reviews);
        } catch (e) {
            console.log(e);
            throw e;
        }
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        );
    }
}
