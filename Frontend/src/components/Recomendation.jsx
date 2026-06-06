import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { IoIosSearch } from "react-icons/io";
import { FcCancel } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Book from "./Book";
import API_BASE_URL from "../api";

const Recomendation = () => {
  const [input, setInput] = useState({
    book_name: "",
  });

  const [recommended_books, setRecommended_books] = useState([]);
  const [error, setError] = useState(false);

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    if (error) {
      setError(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.book_name.trim()) {
      setError(true);
      setRecommended_books([]);
      return;
    }

    try {
      const res = await axios.post(
        `${API_BASE_URL}/recommendation`,
        {
          book_name: input.book_name,
        }
      );

      if (Array.isArray(res.data) && res.data.length > 0) {
        setRecommended_books(res.data);
        console.log(res.data)
        setError(false);
      } else {
        setRecommended_books([]);
        setError(true);
      }
    } catch (err) {
      console.log(err);
      setRecommended_books([]);
      setError(true);
    }
  };

  return (
    <div>
      <Navbar />

      <h1 className="text-center text-2xl font-bold my-4">Recomended Books</h1>

      {/* Search Section */}
      <form
        onSubmit={submitHandler}
        className="flex flex-col items-center mt-4"
      >
        <motion.div
          animate={
            error
              ? {
                  x: [-10, 10, -8, 8, -5, 5, 0],
                }
              : {}
          }
          transition={{ duration: 0.4 }}
          className={`w-full max-w-2xl rounded-2xl border bg-white transition-all duration-300
            ${
              error
                ? "border-red-400 shadow-lg shadow-red-200"
                : "border-slate-200 shadow-xl shadow-blue-100/40"
            }`}
        >
          <input
            type="text"
            name="book_name"
            value={input.book_name}
            onChange={changeEventHandler}
            placeholder="Search Similar Books..."
            className="w-full bg-transparent px-5 py-2 outline-none text-lg"
          />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="mt-4 flex items-center gap-2 rounded-xl bg-blue-500 px-6 py-2 text-white font-semibold hover:bg-blue-600"
        >
          <IoIosSearch size={20} />
          Search
        </motion.button>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-3"
            >
              <FcCancel size={24} />
              <p className="font-medium text-red-600">
                Book not found.Please make sure the title is correct.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Recommendations */}
      <AnimatePresence mode="wait">
        {recommended_books.length > 0 && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-auto grid grid-cols-4 gap-8 px-4 py-10"
          >
            {recommended_books.map((book, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}
              >
                <Book book={book} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Recomendation;
