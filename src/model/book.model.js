import mongoose from "mongoose";
const bookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    no_of_page: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    released_year: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);
const Book = mongoose.model("Book", bookSchema);
export default Book;
