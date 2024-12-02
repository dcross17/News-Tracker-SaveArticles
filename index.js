import "dotenv/config";
import { mongoose } from "mongoose";
import cors from "cors";
import express from "express";
import articleRoutes from "./controllers/articles_controller.mjs";

const PORT = process.env.PORT;
const app = express();
const corsOrigin = {
  origin: "http://localhost:5173", //port for frontend to ensure only frontend can access
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOrigin));
app.use(express.json());
app.use("/articles", articleRoutes);

async function connectToDatabase(dbName) {
  await mongoose.connect(process.env.MONGODB_CONNECT_STRING, {
    dbName: dbName,
  });
  return mongoose.connection;
}

async function main() {
  const articleDbConnection = await connectToDatabase(
    process.env.ARTICLES_DB_NAME
  );
  console.log("Connected to articles_db");
}

main().catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
