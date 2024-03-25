const error404 = (req, res) => {
  res
    .status(404)
    .render("error.pug", {
      title: "Error 404 Not Found",
      message: "El recurso que estas buscando no exite",
    });
};

export default {
  error404,
};
