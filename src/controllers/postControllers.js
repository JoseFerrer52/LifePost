import { writeDatabase, readDatabase } from "../services/database.js";
import { response } from "../utils/response.js";

const postAddControllers = async (req, res) => {
  const tasks = await readDatabase();
  const data = req.body;
  //console.log(datos.userName);
  let { userPost, userName, userDate } = data;
  let userId = tasks.length + 1;
  tasks.push({
    userId: userId,
    userPost: userPost,
    userDate: userDate,
    userName: userName,
    completed: false,
  });

  await writeDatabase(tasks);

  response(res, 200, "Post subido con éxito", );
};

export { postAddControllers };
