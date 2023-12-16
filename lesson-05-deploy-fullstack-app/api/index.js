import os from "os";
import cors from "cors";
import express from "express";
import { PORT } from "./configs.js";
import { addDataToDB, getDataFromDB } from "./db.js";

const HOSTNAME = os.hostname();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => res.send("hello world from api!"));
app.get("/db", async (_, res) => {
  try {
    const resp = await getDataFromDB();
    res.status(200).json({
      host: HOSTNAME,
      message: "success",
      data: resp,
    });
  } catch (error) {
    console.log("error message -", error?.message);
    res.status(500).json({
      host: HOSTNAME,
      message: "failed",
      error: error?.message,
    });
  }
});
app.post("/db", async (req, res) => {
  try {
    console.log("received request body -", req.body);

    const { text } = req.body;
    await addDataToDB(text);
    
    res.status(200).json({
      host: HOSTNAME,
      message: "success",
    });
  } catch (error) {
    console.log("error message -", error?.message);
    res.status(500).json({
      host: HOSTNAME,
      message: "failed",
      error: error?.message,
    });
  }
});

app.listen(PORT, () => console.log("api server started on port", PORT));
