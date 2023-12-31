import mysql from "mysql2/promise";
import { dbConfigs, sqlTable } from "./configs.js";

export const getDataFromDB = async () => {
  const query = `SELECT * FROM ${sqlTable}`;
  const connection = await mysql.createConnection(dbConfigs);
  const [data, _] = await connection.execute(query);
  data.sort((a, b) => b.id - a.id);
  await connection.end();
  return data;
};

export const addDataToDB = async (text) => {
  const query = `INSERT INTO ${sqlTable} (text) VALUES ('${text}')`;
  const connection = await mysql.createConnection(dbConfigs);
  await connection.execute(query);
  await connection.end();
};
