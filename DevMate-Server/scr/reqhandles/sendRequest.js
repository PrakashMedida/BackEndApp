const ConnectionRequest = require("../models/ConnectionRequest");
const User = require("../models/User");


const sendRequest = async (req, res) => {
  try{
    const fromUserId = req.user._id;
  const toUserId = req.params.toUserId;
  const status = req.params.status;

  const validStatus = "intrested";
  if (!validStatus === status )
    return res.status(400).send("status is invalid!");

  const toUser = await User.findById(toUserId);


  if (!toUser) return res.status(404).send("user is not found");
  if (fromUserId.equals(toUserId))
    return res.status(400).send("can not send request to yourself!");

  const isReqPresent = await ConnectionRequest.findOne({
    $or: [
      { fromUserId, toUserId },
      { fromUserId: toUserId, toUserId: fromUserId },
    ],
  });
  if (isReqPresent)
    return res.status(400).json({message :"request is already present please check your inbox!"});
  const makeConnection = new ConnectionRequest({
    fromUserId,
    toUserId,
    status,
  });
  await makeConnection.save();
  res.json({
    message: `request Sent from ${req.user.firstName} to ${toUser.firstName}`,
    data:makeConnection,
  });
}catch(err){
  res.status(401).json({ message:`ERR : ${err.message}`});
}
};

module.exports = sendRequest;
