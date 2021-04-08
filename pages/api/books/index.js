import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
    const posts = await prisma.book.findMany({})
    res.json(posts)
}
