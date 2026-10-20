import app from "./app";
import config from "./app/config";
import { prisma } from "./app/lib/prisma";

const port = config.port || 5000;

const main = async () => {
  await prisma.$connect();
  console.log(`Connected to the database`);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

main();
