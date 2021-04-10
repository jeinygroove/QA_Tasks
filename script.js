const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient()

// initialize db with 3 books and 1 review to the first book
async function main() {
    await prisma.review.deleteMany({})
    await prisma.book.deleteMany({})

    await prisma.book.create({
        data: {
                id: 0,
                title: 'Deadline. Роман об управлении проектами.',
                cover: 'book1.png',
                description: 'Если некие люди, оценив вас как гениального руководителя, ' +
                    'выкрадут вас, увезут в чужую страну и предложат вести интереснейший ' +
                    'проект на весьма выгодных условиях, то вы пройдете путь главного героя ' +
                    'этой книги в точности. Но если вы менеджер, то все, кроме шпионских деталей, ' +
                    '— ваша повседневная реальность.',
                descriptionLong: 'Если некие люди, оценив вас как гениального руководителя, ' +
                    'выкрадут вас, увезут в чужую страну и предложат вести интереснейший проект на ' +
                    'весьма выгодных условиях, то вы пройдете путь главного героя этой книги в точности. ' +
                    'Но если вы менеджер, то все, кроме шпионских деталей, - ваша повседневная реальность.\n' +
                    'Расчет численности команды на разных стадиях проекта, муки выбора при найме сотрудников ' +
                    'и тягостные ощущения при их увольнении, работа в условиях цейтнота, арбитраж во внутренних ' +
                    'конфликтах, защита подчиненных от необдуманных действий вышестоящего руководства - все это ' +
                    'до боли знакомо многим менеджерам. Потому что управление проектами - это всегда работа с людьми.\n' +
                    'Под выводами, которые заносит главный герой в свою записную книжку, могут подписаться тысячи ' +
                    'руководителей. Однако сформулировать их в повседневной текучке самостоятельно удается не всегда. ' +
                    'Поэтому наибольшую пользу эта книга принесет руководителям проектов любого масштаба.',
                averageRating: 4,
                totalRates: 1,
            }
    })

    await prisma.book.create({
        data: {
            id: 1,
            title: 'Пять пороков команды.',
            cover: 'book2.png',
            description: 'Этот бизнес-роман посвящен тому, как грамотно строить корпоративную среду. ' +
                '\nВ технологическую компанию, оказавшуюся на грани упадка, ' +
                'приходит новый руководитель и начинает налаживать работу команды менеджеров, ' +
                'а вернее, создавать ее заново. Вслед за героями читатель узнает о пяти пороках.',
            descriptionLong: 'Этот бизнес-роман посвящен тому, как грамотно строить корпоративную среду.\n' +
                '\n' +
                '\n' +
                'В технологическую компанию, оказавшуюся на грани упадка, приходит новый руководитель ' +
                'и начинает налаживать работу команды менеджеров, а вернее, создавать ее заново. Вслед за ' +
                'героями читатель узнает о пяти пороках, которые могут уничтожить любой коллектив, а также о ' +
                'том, каким образом можно их нейтрализовать и превратить свою прежде рассогласованную команду ' +
                'в отряд победителей.\n' +
                '\n' +
                '\n' +
                'Если корпоративная среда – слабое место вашей компании, эту книгу должны прочитать все: от руководителя до рядового сотрудника.',
            averageRating: 0,
            totalRates: 0,
        },
    })

    await prisma.book.create({
        data: {
            id: 2,
            title: '45 татуировок личности: Правила моей жизни',
            cover: 'book3.png',
            description: 'Все мы попадаем в разные жизненные ситуации, но не всегда делаем из них выводы, ' +
                'а тем более не всегда формулируем принципы и правила жизни. Максим Батырев, ' +
                'успешный бизнес-тренер, - делает. И делится ими. Многие из этих принципов можно ' +
                'назвать универсальными.',
            descriptionLong: 'Имя Максима Батырева широко известно в российском бизнес-сообществе. ' +
                'Его карьерный путь можно без преувеличения назвать выдающимся. Рядовая должность ' +
                'сотрудника отдела продаж — 15 лет назад. Собственная компания Batyrev Consulting Group, ' +
                'работающая по семи направлениям, — сегодня.\n' +
                '\n' +
                'Лучший продавец. Лучший руководитель отдела. Лучший коммерческий директор года России. ' +
                'Лучший автор года России в номинации «Бизнес-литература». Лучший бизнес-спикер года. ' +
                'Автор одних из самых продаваемых бизнес-книг в России — «45 татуировок менеджера» и ' +
                '«45 татуировок продавана». Максим Батырев уверен, что это лишь начало большого жизненного Пути.\n' +
                '\n' +
                'Такие достижения не приходят сами собой. За ними стоит тяжелая работа, ошибки и «шишки»,' +
                ' уроки и выводы. Многие из них навсегда врезаются в сердце и сознание, словно татуировки.' +
                ' 45 своих «татуировок», ставших правилами жизни, Максим Батырев открывает в этой книге. ' +
                'Из каждого эпизода своей жизни он выводит правила взаимодействия с миром, семьей, самим ' +
                'собой — и все удачи и трудности складываются в картину того, как в любой ситуации ' +
                'оставаться собой и шагать все выше по лестнице саморазвития.\n' +
                '\n' +
                'Наверняка многие из этих правил вы сможете применить в своей жизни. ' +
                'И наверняка найдете, чем их дополнить.',
            averageRating: 0,
            totalRates: 0,
        }
    })

    await prisma.review.create({
        data: {
            name: "Иван",
            text: "Точно также каждый человек должен бороться с духом" +
                    "медлительности, сидящим внутри его, если он надеется получить свою долю в " +
                    "богатствах Вавилона.",
            stars: 4,
            book: {connect: {id: 0 }},
        }
    })

    const allBooks = await prisma.book.findMany()
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
