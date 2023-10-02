
import { app } from "./app.js";
import database from "./db/db.js";

async function main() {
  await database.sync();
  app.listen(4000);
  console.log("Server on port 4000");
}

main();