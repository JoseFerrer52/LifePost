import { Router } from "express";
import { readDatabase, writeDatabase } from "../services/database.js";
import { createFormValidation, validate } from "./validations.js";

const router = Router();
const tasks = await readDatabase();

let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let fullDate = `${day}/${month}/${year}`;

router.get("/", (req, res) => {
  res.render("index.pug", { title: "LifePost", tasks: tasks });
});

router.get("/add", (req, res) => {
  res.render("add.pug", { title: "Agregar Tarea", fullDate: fullDate });
});

router.post("/add", validate(createFormValidation), async (req, res) => {
  const tasks = await readDatabase();
  console.log(tasks);

  const datos = req.body;
  //console.log(datos.userName);

  let { title, userName, date } = datos;

  let id = tasks.length + 1;
  tasks.push({
    id: id,
    title: title,
    date: date,
    userName: userName,
    completed: false,
  });

  await writeDatabase(tasks);

  res.status(200).json({
    status: 200,
    message: "reseña guardada con exito",
  });
});

export default router;
