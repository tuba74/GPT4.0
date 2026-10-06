import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose  from "mongoose";
import chatRoutes from "./routes/chat.js";
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

app.get("/", (req, res) =>{
    res.send("hello");
})

app.post("/test", async(req, res) =>{
    
})
app.listen(PORT, ()=>{
    
    console.log("server listening at port 8080");
    dbConnection();
})
const dbConnection = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected");
    }catch(err){
        console.log(err);
    }
   
}
