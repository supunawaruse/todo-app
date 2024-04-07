//middleware to trig when enter an invalid url
const notFound = (req,res,next)=>{
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)

}

//middleware to trig when enter invalid id
const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message:err.message
    })
}

export {notFound,errorHandler}

