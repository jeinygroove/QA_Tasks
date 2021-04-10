import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
    try {
        const posts = await prisma.book.findMany({})
        res.json(posts)
    } catch (e) {
        console.log(e)
        throw e;
    }
}
