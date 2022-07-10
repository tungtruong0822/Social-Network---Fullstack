import express from "express";
import Users from "../models/userModel.js";
import bcrypt from "bcrypt";

const authCtrl = {
  register: async (req, res) => {
    const { userName, password, email } = req.body;

    try {
      const user = await Users.findOne({ email });
      if (user) return res.status(400).json({ msg: "Account exits." });

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = new Users({
        userName,
        password: passwordHash,
        email,
      });

      // const refresh_token = generateRefreshToken({ id: user._id });
      // res.cookie("refreshtoken", refresh_token, {
      //   httpOnly: true,
      //   path: `/api/refresh_token`,
      //   maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      // });

      await newUser.save();

      res.status(200).json({ msg: "Register Success ...", user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "Incorrect Password or UserName." });

      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword) {
        return res.status(400).json({ msg: "Your Password incorrect." });
      }

      res.status(200).json({ msg: "Login Success ...", user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ msg: "Please login now..." });
      }

      const user = await Users.findById(userId).select("-password");

      if (!user) {
        return res.status(400).json({ msg: "This Account don't exist." });
      }

      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default authCtrl;
