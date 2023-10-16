
import { app } from "./app.js";
import { PORT } from "./config.js";
import database from "./db/db.js";


async function main() {
  await database.sync({force: true});
  app.listen(PORT);
  console.log(`Server on port http://localhost:${PORT}`);
}

main();