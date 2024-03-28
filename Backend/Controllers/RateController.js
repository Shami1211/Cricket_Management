const Rate = require("../Model/RateModel");

const getAllRate = async (req, res, next) => {
  let rate;
  try {
    rate = await Rate.find();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
  
  if (!rate || rate.length === 0) {
    return res.status(404).json({ message: "Rate not found" });
  }
  
  return res.status(200).json({ rate });
};

const addRate = async (req, res, next) => {
  const { username, email, rates, comment } = req.body;

  // Check if rates field is provided
  if (!rates) {
    return res.status(400).json({ message: "Rates field is required" });
  }

  let rate;

  try {
    rate = new Rate({ username, email, rates, comment });
    await rate.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  return res.status(201).json({ rate });
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  let rate;

  try {
    rate = await Rate.findById(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (!rate) {
    return res.status(404).json({ message: "Rate not found" });
  }

  return res.status(200).json({ rate });
};

const updateRate = async (req, res, next) => {
  const id = req.params.id;
  const { username, email, rates, comment } = req.body;
  let rating;

  try {
    rating = await Rate.findByIdAndUpdate(id, {
      username,
      email,
      rates,
      comment
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (!rating) {
    return res.status(404).json({ message: "Rate not found" });
  }

  return res.status(200).json({ rating });
};

const deleteRate = async (req, res, next) => {
  const id = req.params.id;
  let rate;

  try {
    rate = await Rate.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (!rate) {
    return res.status(404).json({ message: "Rate not found" });
  }

  return res.status(200).json({ rate });
};

exports.getAllRate = getAllRate;
exports.addRate = addRate;
exports.getById = getById;
exports.updateRate = updateRate;
exports.deleteRate = deleteRate;
