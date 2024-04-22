import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';

const CommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('loggedInUser');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`${SERVER_URL}/comments/${commentId}`);
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/comments`, {
        params: { [searchType]: searchTerm }
      });
      setComments(response.data);
    } catch (error) {
      console.error('Error searching comments:', error);
    }
  };

  const handleSortById = () => {
    const sortedComments = [...comments].sort((a, b) => a._id.localeCompare(b._id));
    setComments(sortedComments);
  };

  return (
    <div className="comments-container">
      <h1>Comments</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search term..."
        />
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="loggedInUser">Logged In User</option>
          <option value="itemId">Item ID</option>
        </select>
        <button onClick={handleSearch}>Search</button>
        <button onClick={fetchComments}>Reset</button>
        <button onClick={handleSortById}>Sort by ID</button>
      </div>
      <div className="comments-grid">
        {comments.map((comment) => (
          <div key={comment._id} className="comment-item">
            <p><strong>Logged In User:</strong> {comment.loggedInUser}</p>
            <p><strong>Item ID:</strong> {comment.itemId}</p>
            <p><strong>Comment:</strong> {comment.comment}</p>
            <button onClick={() => handleDelete(comment._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsPage;
