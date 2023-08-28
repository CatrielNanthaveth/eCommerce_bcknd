const pool = require("../db");
const jwt = require("jsonwebtoken");
const { encryptPassword } = require("../utils/encryptPassword");
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
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1;", [
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

const createUser = async (req, res, next) => {
  const { username, password, user_role } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE username = $1;", [
      username,
    ]);

    if (user.rows[0])
      return res.status(400).json({ message: "User already created" });

    const { salt, hashed_password } = encryptPassword(password);

    const result = await pool.query(
      "INSERT INTO users (username, hashed_password, password_salt, user_role) VALUES ($1, $2, $3, $4) RETURNING *;",
      [username, hashed_password, salt, user_role]
    );

    const token = jwt.sign({ id: result.rows[0].id, role: user_role }, process.env.SECRET, {
      expiresIn: 86400, //24 horas
    });

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const user_id = req.params.id;

  try {
    const result = await pool.query("DELETE FROM users WHERE user_id = $1 RETURNING *;", [user_id]);

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "user not found",
      });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser
};
