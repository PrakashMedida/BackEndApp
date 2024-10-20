const logout = (req, res) => {
  

  res.cookie("F_2_0", null, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expires: new Date(Date.now()),
  }).status(200).json({message:"logout!"});
};
module.exports = logout;
