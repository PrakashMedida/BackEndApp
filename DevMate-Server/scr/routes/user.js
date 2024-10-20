const ConnectionRequest = require("../models/ConnectionRequest");
const User = require("../models/User");
const Auth = require("../utils/Auth");

const express=require("express");
const userRouter = express.Router();
const SAFE_DATA ="firstName lastName age about gender skills profileURL";

userRouter.get("/requests/all",Auth,async(req,res)=>{

try {
    const loggedinUser = req.user;
    const data = await ConnectionRequest.find({
         toUserId:loggedinUser._id,
         status:"intrested"
    }).populate("fromUserId",SAFE_DATA);
    res.json({
        message:"All pending requests!",
        data
    })
} catch (error) {
    
}



});
userRouter.get("/connections/view",Auth,async(req,res)=>{
    try {
        const loggedinUser=req.user;
        const connectionRequests =await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedinUser._id,status:"accepted"},
                {toUserId:loggedinUser._id,status:"accepted"},
            ]
        }).populate("fromUserId",SAFE_DATA).populate("toUserId",SAFE_DATA);
        const data = connectionRequests.map(e=>{
            if(e.fromUserId._id.equals(loggedinUser._id)) return { fromUserId :e.toUserId ,
                _id : e._id
            }
            else return { fromUserId:e.fromUserId ,
                _id : e._id
            }
            
        })
        res.json({
            message:"all connections",
            data
        })
    } catch (error) {
        res.send("Err: "+error.message);
    }
});

userRouter.get("/feed",Auth,async(req,res)=>{
    try {
        const page=req.query.page||1;
        let limit = req.query.limit||10;
        limit = limit>50? 50:limit;
        const skip = (page-1)*limit;


        const loggedinUser =req.user;
        const connections = await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedinUser._id},
                {toUserId:loggedinUser._id}
            ]


        }).select("fromUserId toUserId");
        
            let userCount =await User.countDocuments({});


        const hideUserId=new Set();
        connections.forEach(e=>{
            hideUserId.add(e.fromUserId._id.toString());
            hideUserId.add(e.toUserId._id.toString());
        })
        
        const users= await User.find({
            $and:[
            {_id:{$nin : Array.from(hideUserId)}},
            {_id:{$ne:loggedinUser._id}}
            ]
        }).select(SAFE_DATA).skip(skip).limit(limit);

        userCount =userCount- Array.from(hideUserId).length-1      

        if(users.length === 0) return res.status(404).json({message:"no users data!"})
        res.json({message:"feed",data:users ,total:userCount  });

    } catch (error) {
        res.status(401).json({message:`ERR : ${error.message}`});
    }
})



module.exports= userRouter;