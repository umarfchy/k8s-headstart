import express from "express";
import os from "os";

const HOSTNAME = os.hostname();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => res.send("hello world from api!"));
app.post("/", (req, res) => {
  try {
    console.log("received request body -", req.body);
    res.status(200).json({
      host: HOSTNAME,
      message: "success",
    });
  } catch (error) {
    console.log("error message -", error?.message);
    res.status(500).json({
      host: HOSTNAME,
      message: "failed",
    });
  }
});

app.listen(PORT, () => console.log("api server started on port", PORT));
