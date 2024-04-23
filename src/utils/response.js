const response = (res, status) =>{
res.status(status).json({
    error: false,
})
}

export {response}