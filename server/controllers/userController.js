const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password, location, exp, skills, preferredJobType } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      location,
      exp,
      skills,
      preferredJobType,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(404).json({ message: "Invalid credentials" });
    } else {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res.json({ token, name: user.name });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

module.exports = { register, login };
