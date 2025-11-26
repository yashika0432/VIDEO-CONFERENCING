import { User } from "../models/user.models.js";
import httpstatus from "http-status";
import bcrypt, { hash } from "bcrypt";
import crypto from "crypto";

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "please provide correct info " });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(httpstatus.NOT_FOUND)
        .json({ message: "User not found" });
    }
    if (bcrypt.compare(password, user.password)) {
      let token = crypto.randomBytes(20).toString("hex");
      user.token = token;
      await user.save();
      return res.status(httpstatus.OK).json({ token: token });
    }
  } catch (e) {
    return res.status(500).json({ message: `something went wrrrong ${e}` });
  }
};

const register = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const exisitingUser = await User.findOne({ username });
    if (exisitingUser) {
      return res
        .status(httpstatus.FOUND)
        .json({ message: "user already exists" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      username: username,
      password: hashedpassword,
    });
    await newUser.save();
    return res.status(httpstatus.CREATED).json({ message: "user registerred" });
  } catch (e) {
    return res.status(500).json({ message: `something went wrong ${e}` });
  }
};

export { login, register };
