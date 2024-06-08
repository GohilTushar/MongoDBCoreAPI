import { messageObject, pageConstant } from "../config/constant.js";
const { book } = messageObject;
import {
  existanceOfUserForBook,
  bookCreation,
  allBooks,
  bookCount,
  getBookDetail,
  updateBookDetail,
  deleteBookDetail,
} from "../service/service.js";

const createBook = async (req, res) => {
  const userId = req.user.id;
  try {
    const {
      name,
      description,
      no_of_page,
      author,
      category,
      price,
      released_year,
      status,
    } = req.body;

    const userExists = await existanceOfUserForBook(userId);
    if (!userExists)
      return res.status(400).json({ message: book.userNotFoundError });

    const newBook = await bookCreation(
      userId,
      name,
      description,
      no_of_page,
      author,
      category,
      price,
      released_year,
      status,
    );
    return res.status(201).json({ message: book.bookCreation, newBook });
  } catch (e) {
    return res.status(500).json({ error: e, message: book.serverError });
  }
};

const bookList = async (req, res) => {
  try {
    const {
      page = pageConstant.page,
      limit = pageConstant.limit,
      search = "",
    } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const offset = (pageNumber - 1) * limitNumber;
    const userId = req.user.id;

    const searchQuery = {
      userId,
      $or: [
        { name: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    };

    const books = await allBooks(searchQuery, offset, limitNumber);

    const totalBooks = await bookCount(searchQuery);

    const totalPages = Math.ceil(totalBooks / limitNumber);
    if(totalPages==0){
      return res
      .status(404)
      .json({ message: book.bookNotFoundError });
    }
    if (pageNumber > totalPages) {
      return res
        .status(400)
        .json({ message: book.exceedLimit });
    }
    return res.status(200).json({
      BookList: books,
      pagination: {
        totalBooks,
        totalPages,
        currentPage: pageNumber,
        pageSize: limitNumber,
      },
      search: search,
    });
  } catch (e) {
    return res.status(500).json({ Error: e, message: book.serverError });
  }
};
const bookDetail = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const data = await getBookDetail(id, userId);
    return res.status(200).json({ BookDetails: data });
  } catch (e) {
    return res.status(500).json({ Error: e, message: book.serverError });
  }
};

const updateBook = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const {
      name,
      description,
      no_of_page,
      author,
      category,
      price,
      released_year,
      status,
    } = req.body;

    const data = await updateBookDetail(
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
    );
    return res.status(200).json({ UpdatedBook: data });
  } catch (e) {
    if (e.errorResponse) {
      return res.status(400).json({ Error: e.errorResponse.errmsg });
    }
    return res.status(500).json({ Error: e, message: book.serverError });
  }
};
const deleteBook = async (req, res) => {
  const userId = req.user?.id;
  try {
    const { id } = req.params;
    const data = await deleteBookDetail(id, userId);
    return res.status(200).json({ DeletedBook: data });
  } catch (e) {
    return res.status(500).json({ Error: e, message: book.serverError });
  }
};

export { createBook, bookList, bookDetail, deleteBook, updateBook };
