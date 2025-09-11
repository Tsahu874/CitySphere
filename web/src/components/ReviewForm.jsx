import React, { useState } from "react";

const ReviewForm = ({ vendorId, onAddReview }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newReview = {
      name,
      rating: parseInt(rating),
      comment,
      date: new Date().toISOString().split("T")[0],
    };

    onAddReview(vendorId, newReview);
    setName("");
    setRating(5);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>
            {r} ⭐
          </option>
        ))}
      </select>
      <textarea
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
