import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
    // register user steps
    // get user details from frontend 
    //validation-(not empty) wheter the email is empty or not userdetails is right or wrong
   //check if user already exists: username,email
   //check files is present or not(check for images,check for avatar)
   //if avaibel upload them to cloudinary, check avatar again
   //create user object(full detail)- create entry in db
   //remove password and refresh token  field from response
   //check for user creation
   //agr user creation ho gaya hoga to hum retrun response kar denge


   //user detail lena(body ke ander sari detail mil jati hai)
   //data json se aata hai
   const {fullName,email,username,password}  = req.body  //destructure data
   //console.log("email: ", email);
   //check kahi humne empty string to nahi pass kar di

   if (
       [fullName, email, username, password].some((field) => 

       field?.trim() === "") // a function that predicate upto three arguments   
   ) {
        throw new ApiError(400, "All fields are required")
   }
   // find vo user jo upar diye gye username,password ko use karta
   const existedUser= await User.findOne({
    // all values are checked under object
      $or: [{ username  }, { email }]
   })
   if(existedUser){
      throw new ApiError(409, "User with email or username already exists")
   }

   //console.log(req.files);


   const avatarLocalPath = req.files?.avatar[0]?.path;
      //path apne files ko server per le aaya hai
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    //hume ake bug mila to usko hum resolve kar diye

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        coverImageLocalPath = req.files.coverImage[0].path
    }
    //check avatar image will be come or not
    if (  !avatarLocalPath ) {
        throw new ApiError(400, "Avatar file is required")
        
    }

    // upload both on cloudinary

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    console.log("Avatar Response:", avatar);   // 👈 Sirf testing ke liye

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if ( !avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    //create database entry(create object)
   const user = await User.create({
    fullName,
    avatar: avatar.secure_url,
    coverImage: coverImage?.secure_url || "",
    email,
    password,
    username: username.toLowerCase()
})


    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken" //this field is not selected
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered succesfully")
    )

})
export  {
    registerUser,
}