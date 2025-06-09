// src/pages/ReviewsPage/ReviewsPage.jsx
import React from "react";
import { useOutletContext } from "react-router-dom";
import styles from "./ReviewsPage.module.css";

export default function ReviewsPage() {
  const { van } = useOutletContext();
  const reviews = van?.reviews || []; 

  if (!reviews.length)
    return <p className={styles.noReviews}>No reviews yet.</p>;

  return (
    <div className={styles.reviewsContainer}>
      {reviews.map((review, index) => (
        <div key={index} className={styles.review}>
          <div className={styles.header}>
            <div className={styles.avatar}>
              {review.reviewer_name
                ? review.reviewer_name.charAt(0).toUpperCase()
                : "?"}
            </div>
            <div>
              <span className={styles.author}>
                {review.reviewer_name || "Unknown"}
              </span>
              <div className={styles.rating}>
                {}
                {}
                {console.log(
                  `Review ${index + 1} rating:`,
                  review.reviewer_rating, 
                  `Type:`,
                  typeof review.reviewer_rating 
                )}
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    className={`${styles.starIcon} ${
                     
                      
                      i < Number(review.reviewer_rating)
                        ? styles.starFilled
                        : ""
                    }`}
                  >
                    <use href={`/images/icons.svg#icon-star`}></use>
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <p className={styles.text}>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
