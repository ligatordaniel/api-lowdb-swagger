import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

type Task = {
  id: string;
  name: string;
  description: string;
};

type User = {
  id: string;
  name: string;
  description: string;
};

type Schema = {
  tasks: Task[];
  users: User[];
};

let db: lowdb.LowdbSync<Schema>;  

export const createConnection = async () => {
  const adapter = new FileSync("src/lowdb/db.json");
  db = lowdb(adapter);
  db.defaults({ tasks: [], users: [] }).write();
};

export const getConnection = () => db;
