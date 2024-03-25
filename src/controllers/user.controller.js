const User = require("../models/user.models");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { hash, compare } = require("bcrypt");

// Acess Token
const generateAccess = async (userId) => {
  try {
    const user_acess = await User.findById(userId);
    // console.log(user_acess, "User");
    const access_token = user_acess.generateAccess_token();
    // console.log("Acess", access_token);
    return access_token;
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
    // console.log(error);
  }
};

//  Signup / Register

const signup = asyncHandler(async (req, res) => {
  /*  Steps For Registering User in DB
    1. Get Data form body { name , email , password, mobileno} 
    2. Check if email exists or not 
    3.validate if all fields are not empty 
    4.encrypt password 
   */

  const { name, email, password, mobileNo } = req.body;

  if ([name, email, password, mobileNo].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required !!");
  }

  const existing_user = await User.findOne({ email, mobileNo });

  if (existing_user) {
    throw new ApiError(400, "User Already Exists Please Log In ");
  }

  const encrypted_password = await hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: encrypted_password,
    mobileNo,
  });

  const created_user = await User.findById(user._id).select("-password");

  if (!created_user) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, created_user, "User has been sucessfully created")
    );
});

// Login
const login = asyncHandler(async (req, res) => {
  /* Steps For Login User
    1. Get Data from Body {email , password}
    2. Find User 
    3. compare password with db 
   */

  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(400, "User is Not Registered , Please Signup");
  }

  const match_password = await compare(password, user.password);

  if (!match_password) {
    throw new ApiError(401, "Invalid User credentials");
  }

  const access_token = await generateAccess(user._id);

  const logged_user = await User.findById(user._id).select("-password");

  if (!logged_user) {
    throw new ApiError(402, "Error While Loggind Please Try Again ");
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("access_token", access_token, options)
    .json(
      new ApiResponse(
        200,
        {
          user: logged_user,
          access_token,
        },
        "User logged In Successfully"
      )
    );
});

const logout_user = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    new: true,
  });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

module.exports = { signup, login, logout_user };
