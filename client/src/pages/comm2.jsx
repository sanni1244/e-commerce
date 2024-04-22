import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';

const RepeatedCommentsPage = () => {
  const [repeatedComments, setRepeatedComments] = useState([]);

  useEffect(() => {
    fetchRepeatedComments();
  }, []);

  const fetchRepeatedComments = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/comments`);
      const comments = response.data;

      // Group comments by content
      const commentsMap = new Map();
      comments.forEach(comment => {
        const key = comment.comment.toLowerCase().trim();
        const existingComments = commentsMap.get(key) || [];
        commentsMap.set(key, [...existingComments, comment]);
      });

      // Filter and sort repeated comments
      const repeatedCommentsArray = [];
      commentsMap.forEach((commentArray) => {
        if (commentArray.length > 1) {
          repeatedCommentsArray.push(...commentArray);
        }
      });

      // Sort repeated comments by content
      repeatedCommentsArray.sort((a, b) => a.comment.localeCompare(b.comment));

      setRepeatedComments(repeatedCommentsArray);
    } catch (error) {
      console.error('Error fetching repeated comments:', error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`${SERVER_URL}/comments/${commentId}`);
      fetchRepeatedComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="comments-container">
      <h1>Repeated Comments</h1>
      <div className="comments-grid">
        {repeatedComments.map((comment) => (
          <div key={comment._id} className="comment-item">
            <p><strong>Logged In User:</strong> {comment.loggedInUser}</p>
            <p><strong>Item ID:</strong> {comment.itemId}</p>
            <p><strong>Comment:</strong> {comment.comment}</p>
            <p><strong>Rating:</strong> {comment.rating}</p>
            <p><strong>Created At:</strong> {new Date(comment.createdAt).toLocaleString()}</p>
            <button onClick={() => handleDelete(comment._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepeatedCommentsPage;
