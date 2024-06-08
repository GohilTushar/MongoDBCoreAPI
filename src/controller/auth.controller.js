import fs from "fs";
import {
  registrationSchema,
  loginSchema,
} from "../validators/auth.validator.js";
import bcrypt from "bcrypt";
import generateAuthToken from "../utils/generateToken.js";
import { messageObject } from "../config/constant.js";
const { user } = messageObject;
import {
  existanceOfUser,
  getUserList,
  userCreation,
} from "../service/service.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const signup = async (req, res) => {
  try {
    let check='';
    await registrationSchema.validateAsync(req.body);
    const { name, email, password, gender, interest } = req.body;
    const userExist = await existanceOfUser(email);
    const filePath = req.file?.path;
    if(filePath){
      check = await uploadOnCloudinary(filePath, req.file.originalname);
      if (!check) return res.status(400).json({ Error: user.uploadTypeError });
    }
    if (userExist) {
      if(filePath)fs.unlinkSync(filePath);
      return res.status(400).json({ Error: user.userExistError });
      }
    const createdUser = await userCreation(
      name,
      email,
      password,
      gender,
      interest,
      check == '' ? null : check?.secure_url
    );

    return res.status(201).json({ message: user.userCreation, createdUser });
  } catch (e) {
    const filePath = req.file?.path;
    if (filePath) fs.unlinkSync(filePath);
    return res.status(400).json({ Error: e.details[0].message });
  }
};

const userList = async (req, res) => {
  try {
    const data = await getUserList();
    return res.status(200).json({ UserList: data });
  } catch (e) {
    return res.status(500).json({ Error: e, message: user.serverError });
  }
};
const userDetails = async (req, res) => {
  try {

    const Data = req.user;
    return res.status(200).json({ UserDetails: Data });
  } catch (e) {
    return res.status(500).json({ Error: e, message: user.serverError });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    await loginSchema.validateAsync(req.body);
    const userExist = await existanceOfUser(email);
    if (!userExist)
      return res.status(401).json({ messege: user.userNotExistError });

    const isValid = await bcrypt.compare(password, userExist.password);
    if (!isValid) return res.status(401).json({ messege: user.failedLogin });
    const token = generateAuthToken({
      id: userExist._id,
      email: userExist.email,
    });
    return res.status(200).json({ messege: user.successLogin, token: token });
  } catch (e) {
    res
      .status(500)
      .json({ Error: e.details[0].message, message: user.serverError });
  }
};

export { signup, userList, userDetails, login};
