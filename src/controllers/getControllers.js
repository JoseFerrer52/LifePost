import { format } from "date-fns";
import { readDatabase} from "../services/database.js";

const tasks = await readDatabase();
const date = new Date();
const fullDate = format(date, "dd/MM/yyyy");

const getindexControllers = (req, res) => {
  res.render("index.pug", { title: "LifePost", tasks: tasks });
};

const getAddcontrollers = (req, res) => {
  res.render("add.pug", { title: "Agregar Tarea", fullDate: fullDate });
};

export { getindexControllers, getAddcontrollers };
