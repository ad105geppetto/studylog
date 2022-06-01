import express from "express"
import indexRouter from "./routes";
import cors from "cors"
const port = 4000;
const app = express();

app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});