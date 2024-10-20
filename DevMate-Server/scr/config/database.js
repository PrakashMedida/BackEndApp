
const mongoose = require("mongoose");

const DatabaseConnect = async () => {
  await mongoose.connect(
   "mongodb+srv://prakash:prakash@devcluster.xilri.mongodb.net/DevTinder"
  );
};

module.exports = { DatabaseConnect };


