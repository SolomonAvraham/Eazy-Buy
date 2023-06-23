import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/client.js";

export const register = async (request, response) => {
  try {
    const { fullName, email, password, address, role } = request.body;
    const user = await User.findOne({ email });
    if (user) {
      return response
        .status(400)
        .json({ message: "אימייל קיים במערכת, אנא נסה שנית !" });
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: passwordHash,
      address,
      role,
    });

    const savedUser = await newUser.save();
    response.status(201).json(savedUser);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};

export const login = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return response.status(400).json({ message: "אימייל לא קיים במערכת !" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response
        .status(400)
        .json({ message: "אימייל או סיסמה אינם נכונים !" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    return response.status(200).json({ token, user });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const result = await User.findById(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
