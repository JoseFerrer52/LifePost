import { app } from "./src/app";
import dontev from "dotenv"

dontev.config()
const port = process.env.PORT || 5500;

app.listen(port, () => {
    console.log(`La aplicación está funcionando en el puerto ${port}`);
  });
  