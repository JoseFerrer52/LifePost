import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dirname, join } from "path"; 
import { fileURLToPath } from "url"; 
import { routerError} from "./utils/routerError.js";
import { resError } from "./utils/resError.js";
import {router}  from "./routes/index.js";
import pug from "pug"
import dontev from "dotenv"

dontev.config()
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url)); 
const port = process.env.PORT || 5500;

app.set("views", join(__dirname, "views"));
app.set("view engine", pug);

app.use(express.static(join(__dirname, "public/css")));
app.use(express.static(join(__dirname, "public/img")));
app.use(express.static(join(__dirname, "public/js")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet.contentSecurityPolicy({
  directives: {
     defaultSrc: ["'self'"],
     scriptSrc: ["'self'", 'cdn.jsdelivr.net'],
  }
 }));
app.use(morgan("dev"));

app.use(router)
app.use(routerError);
app.use((error, req, res, next)=>{
  const {status, message, path, name} = error
  resError(res, status, message, name, path)
})



app.listen(port, () => {
  //console.log(`La aplicación está funcionando en el puerto ${port}`);
});