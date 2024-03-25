import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dirname, join } from "path"; 
import { fileURLToPath } from "url"; 
import errorController from "./controllers/errorController.js";
import router  from "./routes/index.js";
import pug from "pug"

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url)); 
const port = 5500;

app.set("views", join(__dirname, "views"));
app.set("view engine", pug);

app.use(express.static(join(__dirname, "public/css")));
app.use(express.static(join(__dirname, "public/img")));
app.use(express.static(join(__dirname, "public/js")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(router)
app.use(errorController.error404);

app.listen(port, () => {
  console.log(`La aplicación está funcionando en http://localhost:${port}`);
});