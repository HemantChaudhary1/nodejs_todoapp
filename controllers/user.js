import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body; // For login we need only email and password

    const user = await User.findOne({ email }).select("+password"); // Because in password schema we have by set select:"false", so we have to manually select password for the email which we will get by findOne funcn

    if (!user) return next(new ErrorHandler("Invalid Email or password", 400));

    // or
    // if (!user) return res.status(404).json({
    //   success: false,
    //   message: "Invalid Email or password",
    // });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or password", 400));

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    // if (user) return res.status(404).json({  //If user exists then it will throw an error
    //   success: false,
    //   message: "User Already Exist",
    // });
    //or
    if (user) return next(new ErrorHandler("User Already Exist", 400));

    const hashedPassword = await bcrypt.hash(password, 10); // We will not directly pass the password , we will hash it and then pass the hashed password at the time of user creation , so that nobody can decrypt the password

    user = await User.create({ name, email, password: hashedPassword }); // If user does not exist, then we will create an user

    sendCookie(user, res, "Registered Successfully", 201); // sendCookie func to reduce code redundancy because we will write same code in for login also and sendcookie creates a cookie whenever we register or log in
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = (req, res) => {
  try {
    res.status(200).json({
      success: "true",
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: "true",
      user: req.user,
    });
};
