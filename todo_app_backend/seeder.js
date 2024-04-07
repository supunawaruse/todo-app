import dotenv from 'dotenv'
import users from './data/users.js'
import User from './models/userModel.js'
import connectDB from './config/db.js'


dotenv.config()
connectDB()

const importData = async() => {
    try {
        await User.deleteMany()
        const createdUsers = await User.insertMany(users)
        console.log('data added succesfully!!!')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

const deleteData = async() =>{
    try {
        await User.deleteMany()
        console.log('data deleted succesfully!!!')
       
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


if(process.argv[2] === '-d'){
    deleteData()
}else{
    importData()
}


