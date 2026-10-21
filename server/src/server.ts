import app from "./app";
import config from "./app/config";
import { prisma } from "./app/lib/prisma";
import { seedTesterStudent } from "./app/utils/seed";

const port = config.port || 5000;

const main = async () => {
  await prisma.$connect();
  console.log(`Connected to the database`);
  await seedTesterStudent();

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

main();
