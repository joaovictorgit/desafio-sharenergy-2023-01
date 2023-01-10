import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userModel = require("../models/user-model");

const UserController = {
  createUser: createUser,
  loginUser: loginUser,
};

async function createUser(request: Request, response: Response) {
  try {
    const { username, password } = request.body;
    const passHash = await bcrypt.hash(password, 8);

    const user = new userModel({
      username: username,
      password: passHash,
    });

    const userSave = await user.save();
    response.status(200).json(userSave);
  } catch (error: unknown) {
    return response.status(400).json(error);
  }
}

async function loginUser(request: Request, response: Response) {
  try {
    const { username, password } = request.body;

    const user = await userModel.findOne({ username: username }).exec();
    const comparePass = await bcrypt.compare(password, user.password);

    if (!user) {
      return response.status(400).json("User not found!");
    }

    if (!comparePass) {
      return response.status(400).json("⚠ Incorrect password.");
    }

    return response.status(200).json({
      user,
      token: jwt.sign(
        {
          id: user._id,
        },
        "sharenergy",
        { expiresIn: "1h" }
      ),
    });
  } catch (error: unknown) {
    response.status(400).json(error);
  }
}

export default UserController;
