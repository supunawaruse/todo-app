import mongoose from 'mongoose'

const todoSchema = mongoose.Schema({
    todo:{
        type: String,
        required:true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps:true
})

const Todo  = mongoose.model('Todo', todoSchema)

export default Todo