import User from "../model/user.model.js";
import Book from "../model/book.model.js";

const existanceOfUser = async (email) => await User.findOne({ email });

const userCreation=async( 
  name,
  email,
  password,
  gender,
  interest,
  image)=>await User.create({
  name,
  email,
  password,
  gender,
  interest,
  image,
});

const getUserList = async () => await User.find();

const existanceOfUserForBook = async (userId) =>await User.findById(userId);

const bookCreation=async( userId,
  name,
  description,
  no_of_page,
  author,
  category,
  price,
  released_year,
  status)=> await Book.create({
  userId,
  name,
  description,
  no_of_page,
  author,
  category,
  price,
  released_year,
  status,
});

const allBooks = async (searchQuery, offset, limitNumber) =>
  await Book.find(searchQuery).skip(offset).limit(limitNumber);
const bookCount = async (searchQuery) => Book.countDocuments(searchQuery);
const getBookDetail = async (id, userId) => Book.findOne({ _id: id, userId });
const updateBookDetail = async (
  id,
  userId,
  name,
  description,
  no_of_page,
  author,
  category,
  price,
  released_year,
  status
) =>
  Book.findOneAndUpdate(
    { _id: id, userId },
    {
      userId,
      name,
      description,
      no_of_page,
      author,
      category,
      price,
      released_year,
      status,
    },
    { new: true, runValidators: true }
  );
const deleteBookDetail = async (id, userId) =>
  Book.findOneAndDelete({ _id: id, userId });

export {
  existanceOfUser,
  userCreation,
  getUserList,
  // getUserDetail,
  existanceOfUserForBook,
  bookCreation,
  allBooks,
  bookCount,
  getBookDetail,
  updateBookDetail,
  deleteBookDetail,
};



