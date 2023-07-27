import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET); // we will create a token using jwt and using dotenv we will pass our secret key

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // max age is 15 minutes after this cookie will be expired and it will forget us
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      // If we have created our user successfully then we will send a message that user is "Registered Successfully"
      success: true, // We have created a cookie here, As We register we will automatically be logged in and a cookie we will be created
      message,
    });
};
