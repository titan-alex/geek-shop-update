const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const createCategories = await prisma.categories.createMany({
        data: [
            {image:"anime.jpg", title: "Аниме", parent_id:0},
            {image:"games.png", title: "Игры", parent_id:0},
            {image:"cartoon.jpg", title: "Мультфильмы", parent_id:0},
            {image:"music.jpg", title: "К-поп / Музыка", parent_id:0},
            {image:"fanko_pop.jpg", title: "Funko Pop", parent_id:0},
            {image:"movies.jpg", title: "Фильмы", parent_id:0},
            {image:"clothes.jpg", title: "Одежда", parent_id:0},
            {image:"GenshinImpact.jpeg", title: "Genshin Impact", parent_id:2},
            {image:"DemonSlayer.jpg", title: "Demon Slayer", parent_id:1},
            {image:"attackOnTitan.jpg", title: "Attak on Titan", parent_id:1},
            {image:"OnePanchMan.jpg", title: "OnePanchMan", parent_id:1},

        ],
        skipDuplicates: true
        }
    );
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1); 
    })