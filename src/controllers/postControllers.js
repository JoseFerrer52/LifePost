import { writeDatabase, readDatabase } from "../services/database.js";
import { response } from "../utils/response.js";


const postAddControllers = async (req, res) => {
    const tasks = await readDatabase();
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

    asss()
  
    await writeDatabase(tasks);
  
   response(res, 200)
    
}

export {postAddControllers,}