import React, { useState, useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import { StyledRating } from "../../../components/styles/note.css";
import { useSelector } from "react-redux";

export default function StressRating(props) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const formContent = useSelector((state) => state.form.value);

  function handleRating(ratingValue) {
    setRating(ratingValue);
    props.newRate(ratingValue);
  }

  useEffect(() => {
    setRating(null);
  }, [formContent.isComplete]);

  return (
    <>
      <StyledRating>
        {[...Array(5)].map((circle, i) => {
          const ratingValue = i + 1;

          return (
            <label key={"circle" + ratingValue}>
              <input
                style={{ display: "none" }}
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => handleRating(ratingValue)}
              />
              <FaCircle
                size={22}
                color={ratingValue <= (hover || rating) ? "#8BA6BC" : "#e4e5e9"}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </StyledRating>
    </>
  );
}
