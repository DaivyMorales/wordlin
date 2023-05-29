import { connect, connection } from "mongoose";

type Conn = {
  isConnected: boolean;
};

const conn: Conn = {
  isConnected: false,
};

export const dbConnect = async () => {
  if (conn.isConnected) return;

  const db = await connect("mongodb://127.0.0.1:27017/wordlin");

  conn.isConnected = !!db.connections[0].readyState;

  console.log(db.connection.db.databaseName);
};

connection.on("connected", () => {
  console.log("DB CONNECTED!");
});

connection.on("ERROR", (err) => {
  console.log(err);
});
