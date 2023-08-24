const pool = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users;");
    res.json(allUsers.rows);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      user_id,
    ]);
    if (user.rows.length === 0)
      return res.status(404).json({
        message: "user not found",
      });
    res.json(user.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUser,
};
