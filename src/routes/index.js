import { Router } from "express";

const router = Router()
let tasks = [
     {id: 1, title: "tarea 1", completed: false},
     {id: 2, title: "tarea 2" , completed: true},
 ]


router.get("/", (req, res) => {
    res.render("index.pug", { title: "Lista de Tareas", tasks });
});

  
router.get("/add", (req, res) => {
    res.render("add.pug", { title: "Agregar Tarea" });
  })
  
router.post("/add",  (req, res) => {
    // console.log(req.body);
    let { title } = req.body;
    let id = tasks.length + 1;
    tasks.push({ id: id, title: title, completed: false });
    res.redirect("/");
  });
  
  
router.get("/edit/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let task = tasks.find((task) => task.id === id);
    //console.log(task);
  
    if (!task) {
      res.redirect("/");
    } else {
      res.render("edit.pug", { title: "Editar Tarea", task });
    }
  });
  

router.post("/edit/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let taskIndex = tasks.findIndex((task) => task.id === id);
    //console.log(taskIndex);
  
    if (taskIndex === -1) {
      res.redirect("/");
    } else {
      tasks[taskIndex].title = req.body.title;
      res.redirect("/");
    }
  });
 
  router.get("/complete/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let task = tasks.find((task) => task.id === id);
  
    if (task) {
      task.completed = true;
    }
  
    res.redirect("/");
  });

router.get("/uncomplete/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let task = tasks.find((task) => task.id === id);
  
    if (task) {
      task.completed = false;
    }
  
    res.redirect("/");
  });
  
router.get("/delete/:id", (req, res) => {
    let id = parseInt(req.params.id);
    tasks = tasks.filter((task) => task.id !== id);
    res.redirect("/");
  });

  export default router