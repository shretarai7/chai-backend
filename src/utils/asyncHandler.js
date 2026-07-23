//Helper files


const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error) => 
            next(error))
        
    } // as function accept and as a function return bhi karu
}


export{asyncHandler}




//const asyncHandler = () => {}
//const asyncHandler = (func) => () =>{}
//const asyncHandler = (func) => async() => {}


/*const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message
            
        }) 
    }/*
}*/