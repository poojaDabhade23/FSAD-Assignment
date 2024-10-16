import express, { response } from "express";
import { Book } from "../models/bookModel.js";
import multer from "multer";
import path from "path";
import { request } from "http";
import cookieParser from "cookie-parser";
import { verifyUser } from "./userRoute.js";

const router = express.Router();
router.use(express.static("Public"));
router.use(cookieParser());

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (request, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

//Route for upload a book
router.post(
  "/upload",
  verifyUser,
  upload.single("file"),
  async (request, response) => {
    try {
      const newBook = await Book.create({
        title: request.body.title,
        author: request.body.author,
        price: request.body.price,
        category: request.body.category,
        email: request.body.email,
        file: request.file.filename,
      });

      console.log("Book upload successful");
      return response.status(201).send("Success");
    } catch (err) {
      console.error("Error uploading book:", err);
      return response.status(500).json({ error: "Error uploading book" });
    }
  }
);

//Route for get all books
router.get("/getBook", (request, response) => {
  Book.find()
    .then((books) => response.json(books))
    .catch((err) => response.json(err));
});

// Route to search books by name, author, or categories
router.get("/searchBooks", (request, response) => {
  const { name, author, categories } = request.query;

  // Create an empty filter object
  let filter = {};

  // Add conditions to the filter object based on the query parameters
  if (name) {
    filter.name = { $regex: name, $options: "i" }; // Case-insensitive search
  }
  if (author) {
    filter.author = { $regex: author, $options: "i" }; // Case-insensitive search
  }
  if (categories) {
    filter.categories = { $regex: categories, $options: "i" }; // Case-insensitive search
  }

  // Find books that match the filter criteria
  Book.find(filter)
    .then((books) => response.json(books))
    .catch((err) => response.status(500).json({ error: err.message }));
});

// Route to view a user's transaction history
router.get("/exchange/history/:userId", (req, res) => {
  const { userId } = req.params;

  // Find all exchange requests where the user is either the requester or recipient
  ExchangeRequest.find({ $or: [{ requester: userId }, { recipient: userId }] })
    .populate('book')
    .populate('requester', 'username')  // Populate requester info
    .populate('recipient', 'username')  // Populate recipient info
    .then((exchangeRequests) => {
      res.json({ message: "Transaction history retrieved successfully", exchangeRequests });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

export default router;
