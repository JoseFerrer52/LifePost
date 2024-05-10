const routerError = (req, res) => {
  res.status(404).render("error.pug", {
    name: "Error 404",
    message: "No se encontró el recusrso que estabas buscando",
  });
};


export { routerError};
