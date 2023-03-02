// データベースにアクセスするためのクライアントライブラリ

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const newLink = await prisma.link.create({
    data: {
      description: "GraphQLチュートリアル学習中",
      url: "www.graphql-tutorial.com",
    },
  });

  const allLinks = await prisma.link.findMany();
  console.log(allLinks);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    //データベース接続を閉じる
    prisma.$disconnect;
  });
