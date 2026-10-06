import express from "express";
import Thread from "../models/Thread.js";
const router = express.Router();
import getOpenAi from "../utils/openai.js";

router.get("/thread", async(req, res)=>{
    try{
        const threads = await Thread.find({}).sort({updatedAt: -1});
        res.send(threads);
    }catch(err){
        res.status(500).json({error: "failed to load data"});
    }
    
})

router.get("/thread/:threadId", async(req, res)=>{
    

    try{
        const {threadId} = req.params;
        const thread = await Thread.findOne({threadId});

        if(!thread){
            res.json("thread doesn't exist");
        }else{
            res.json(thread.messages);
        }
        // console.log(thread.messages[0])
        
    }catch(err){
        console.log(err);
        res.status(500).json({error: "failed to load data"});
    }
})
router.delete("/thread/:threadId", async(req, res)=>{
    const {threadId} = req.params;
    try{
        const deletedThread = await Thread.findOneAndDelete({threadId});

        if(!deletedThread){
            res.json("thread doesn't exist");
        }
        // console.log(thread.title);
        // console.log(thread.messages[0])
        res.status(200).json("thread deleted successfully");
    }catch(err){
        console.log(err);
        res.status(500).json({error: "failed to load data"});
    }
})
router.post("/chat", async(req, res)=>{
    const {threadId, message} = req.body;

        if(!threadId || !message){
            res.json({error: "thread undefined"});
    }
    try{
        let thread = await Thread.findOne({threadId});
        if(!thread){
            thread = new Thread({
            threadId,
            title: message,
            messages:[{role: "user", content: message}],
        })
        }else{
            thread.messages.push({role: "user", content: message});
        }
        const assistantReply = await getOpenAi(message);
        thread.messages.push({role: "assistant", content: assistantReply});
        thread.updatedAt = new Date();
        await thread.save();
        
        res.json({reply: assistantReply});
        

    }catch(err){
        console.log(err);
        res.status(500).json({error: "failed to load data"});
    }
})

export default router;