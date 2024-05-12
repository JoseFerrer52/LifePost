import { app } from "./src/app";
import dontev from "dotenv"

dontev.config()

app.listen(port, () => {
    console.log(`La aplicación está funcionando en el puerto ${port}`);
  });
  