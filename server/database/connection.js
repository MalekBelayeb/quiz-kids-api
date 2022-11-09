const mongoose = require('mongoose');
const uri = "mongodb+srv://Userdb:user@cluster0.nms1x.mongodb.net/quizkids";


const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
            imgBucket: "photos",
        })

        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB