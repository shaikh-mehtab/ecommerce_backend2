const mongoose = require('mongoose');

const connectDb =async()=>{
    try {
        await mongoose.connect(process.env.mongoUri)
        console.log(`mongodb connected ${mongoose.connection.host}`.bgBlue);
    } catch (error) {
        console.log(`mongo db error ${error}`.bgRed.red);
    }
}

module.exports = connectDb;