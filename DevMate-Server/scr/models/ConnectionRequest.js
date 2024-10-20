const mongoose=require("mongoose");


const connectionSchema=mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    status:{
        type:String,
        enum:{
            values:["intrested","ignored","accepted","rejected"],
            message:`{VALUE} status invalid`
        }
    }

},{timestamps:true});

connectionSchema.index({fromUserId:1},{toUserId:1});


module.exports= new mongoose.model("connectionRequest",connectionSchema);
