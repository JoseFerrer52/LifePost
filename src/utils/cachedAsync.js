/*cachedAsyn es una funcion de orden superior que va a recivir una funcion y que va a retornar una funcion que va a ejecutar a req, res, 
next y va a ejecutar esta funcion y ante cualquier problema que ocurra esta va a recibir el error y 
lo va a mandar al manejador de errors de express*/ 


const cachedAsync =  (fn) => {
    return (req, res, next) =>{
        fn(req, res).catch((error) => next(error))
    } 
}

export {
    cachedAsync
}