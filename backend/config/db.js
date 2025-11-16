import mongoose from 'mongoose'

const connectDB = async ()=>{
    try{

        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb connected`);
        
    }catch(error){
        console.error(`mongobd connection error (by coder)`, error.message);
        process.exit(1);
    }

}

export default connectDB;