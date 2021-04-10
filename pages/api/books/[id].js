import prisma from '../../../lib/prisma'


// GET /api/books/:id
export default async function handle(req, res) {
    const bookId = req.query.id;
    if (req.method === "GET") {
        try {
            const book = await prisma.book.findUnique({
                where: {id: Number(bookId)},
            });
            res.json(book);
        } catch (e) {
            console.log(e)
            throw e;
        }
    } else if (req.method === "DELETE") {
        try {
            await prisma.review.deleteMany({
                where: {bookId: Number(bookId)},
            });
            const book = await prisma.book.delete({
                where: {id: Number(bookId)},
            });
            res.json(book);
        } catch (e) {
            console.log(e)
            throw e;
        }
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        );
    }
}
