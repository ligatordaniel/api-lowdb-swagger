import app from "./app";
import { createConnection } from "./lowdb/dbTask";
//import { createConnection } from "./lowdb/dbUser";

createConnection();
//createConnection();

app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
