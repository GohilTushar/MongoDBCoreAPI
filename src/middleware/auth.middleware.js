import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import { messageObject } from "../config/constant.js";
const {user,book}=messageObject;
const authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message:user.noToken});
  }
  try {
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: book.userNotFoundError });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: user.invalidToken });
  }
};

export default authenticateUser;
