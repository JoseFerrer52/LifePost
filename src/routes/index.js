import { Router } from "express";
import { readDatabase, writeDatabase } from "../services/database.js";
import { createFormValidation, validate } from "./validations.js";


const router = Router();
let tasks = [
  { id: 1, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi saepe, nostrum dolorum ex sint quibusdam odit explicabo, fugiat obcaecati distinctio neque excepturi aspernatur. Voluptatem eos explicabo quo dolorum at eum, enim ipsam officia adipisci consequatur. Quis asperiores odio porro. Architecto asperiores sed vitae, deserunt pariatur voluptates molestiae quasi adipisci porro culpa voluptatem sint? Neque, blanditiis sit molestias recusandae vel itaque voluptatibus laudantium iste, incidunt doloribus eius porro maiores non rerum quam saepe repellendus reiciendis officia optio dolore aperiam sequi. Nam iure placeat excepturi, sunt, in dicta, provident rerum minus perspiciatis vitae eligendi sapiente eveniet dolorum sequi blanditiis esse! Veniam, necessitatibus?", completed: false },
  { id: 2, title: "tarea 2", completed: true },
];

let date = new Date()
let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()
let fullDate = `${day}/${month}/${year}`
let name = "Pedro"

router.get("/", (req, res) => {
  res.render("index.pug", { title: "LifePost", tasks: tasks, fullDate: fullDate, name:name });
});

router.get("/add", (req, res) => {
  res.render("add.pug", { title: "Agregar Tarea", fullDate: fullDate});
});

router.post("/add", validate(createFormValidation), async (req, res) => {
  
  const tasks = await readDatabase();
  console.log(createFormValidation);
  let { title, nameUser, date } = req.body;
  
  let id = tasks.length + 1;
  tasks.push({ id: id, title: title, date: date, nameUser: nameUser, completed: false });

  await writeDatabase(tasks);

  res.status(200).json({
    status: 200,
    message: "reseña guardada con exito"

  })
});



router.get("/delete/:id", (req, res) => {
  let id = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== id);
  res.redirect("/");
});

export default router;
