const db = require("../db");

async function seed() {
  await db.user.deleteMany();
  await db.user.createMany({
    data: [{ name: "Solène", email: "sosso711@hotmail.com" }],
  });

  await db.lists.deleteMany();
  await db.lists.createMany({
    data: [
      {
        createDate: "2022-03-19T14:21:00+02:00",
        name: "Vacances Hiver",
        userId: 1,
      },
    ],
  });

  await db.Items.deleteMany();
  await db.Items.createMany({
    data: [
      {
        name: "chaussettes",
      },
      {
        name: "doudoune",
      },
      {
        name: "chaussure",
      },
      {
        name: "pantalon",
      },
      {
        name: "chaussettes",
      },
      {
        name: "teeshirt",
      },
    ],
  });
}

seed();
export default seed();
