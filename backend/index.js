import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import connectdb from "./config/connection.js";

dotenv.config();
import cors from "cors";

const app = express();
app.use(cors());

connectdb();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
