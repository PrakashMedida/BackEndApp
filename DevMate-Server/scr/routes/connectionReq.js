const express = require("express");
const Auth = require("../utils/Auth");
const sendRequest = require("../reqhandles/sendRequest");
const ConnectionRequest = require("../models/ConnectionRequest");
const requestRouter = express.Router();

requestRouter.post("/send/:status/:toUserId", Auth,sendRequest);
requestRouter.post("/request/review/:status/:requestId",Auth,async(req,res)=>{
    try{
        const loggedinUser=req.user;
        const {status,requestId}=req.params;
        const validStatus=["accepted","rejected"];
        if(!validStatus.includes(status)) return res.status(400).send("status invalid!");

        const requestUser= await ConnectionRequest.findOne({
            _id:requestId,
           $or : [ {toUserId:loggedinUser._id},
            {fromUserId :loggedinUser._id}],
            $or:[{status:"intrested"},{status:"accepted"}]
            
        })
        if(!requestUser) return res.status(400).send("invalid request!");

        if(status==="accepted" && requestUser.toUserId.equals(loggedinUser._id) ){
            requestUser.status=status;
            const data = await requestUser.save();
            res.json({
                message:"accepted",
                data:data
            })}
            else if(requestUser.status==="accepted" && (requestUser.fromUserId.equals(loggedinUser._id) || requestUser.toUserId.equals(loggedinUser._id))){
                

                const deleteRequest=await ConnectionRequest.findOneAndDelete({
                    _id:requestId})
                res.json({message:"rejected",
                    data:deleteRequest
                })
            }
    }catch(err){
        res.status(400).send(`ERR : ${err.message}`);
    }
})

module.exports = requestRouter;
