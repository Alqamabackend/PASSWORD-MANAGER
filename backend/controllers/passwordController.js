const Password = require("../models/Password");

const addPassword = async (req, res) => {
  const { site, username, password } = req.body;
  try {
    const newPass = await Password.create({ site, username, password });
    res.status(201).json(newPass);
  } catch (error) {
    res.status(500).json({ message: "Failed to add password" });
  }
};

const getPasswords = async (req, res) => {
  try {
    const data = await Password.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching passwords" });
  }
};

const deletePassword = async (req, res) => {
  try {
    await Password.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting password" });
  }
};

module.exports = {deletePassword , getPasswords, addPassword} 