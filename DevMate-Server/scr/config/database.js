
const mongoose = require("mongoose");

const DatabaseConnect = async () => {
  await mongoose.connect(
   "process.env.MONGODBCONNECTIONSTRING"
  );
};

module.exports = { DatabaseConnect };


