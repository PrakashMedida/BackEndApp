const validationData = (req) => {
  const IsData = ["firstName", "lastName", "age", "gender", "skills", "about","profileURL"];

  const IsDataValid=Object.keys(req.body).every(field=> IsData.includes(field));
  return IsDataValid;
};
module.exports = validationData;
