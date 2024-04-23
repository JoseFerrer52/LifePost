const routerError = (req, res) => {
    res
      .status(404)
      .render("error.pug", {
        title: "Error 404 Not Found",
        message: "El recurso que estas buscando no exite",
      });
  };

  const errorServer = (err, req, res, next) => {
    //console.error(err.stack);
    res.status(500).send(`Ocurrio un error en el servidor`);
  };

export {routerError, errorServer}