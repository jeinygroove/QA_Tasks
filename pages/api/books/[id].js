import prisma from '../../../lib/prisma'


// GET /api/books/:id
export default async function handle(req, res) {
    const bookId = req.query.id;
    if (req.method === "GET") {
        const book = await prisma.book.findUnique({
            where: {id: Number(bookId)},
        });
        res.json(book);
    } else if (req.method === "DELETE") {
        await prisma.review.deleteMany({
            where: {bookId: Number(bookId)},
        });
        const book = await prisma.book.delete({
            where: {id: Number(bookId)},
        });
        res.json(book);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        );
    }
}
