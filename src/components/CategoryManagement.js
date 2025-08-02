// components/CategoryManagement.js
import React, { useState, useEffect } from 'react';
import '../styles/categorymanagement.css';

const CategoryManagement = ({ categories, onAdd, onDelete, onClose }) => {
  const [newCategory, setNewCategory] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    onAdd(newCategory);
    setNewCategory('');
  };

  return (
    <div className="category-modal-overlay">
      <div className="category-modal">
        <div className="modal-header">
          <h3>Manage Categories</h3>
          <button onClick={onClose} className="close-btn">
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="category-list">
            {categories.length === 0 ? (
              <p className="no-categories">No categories found</p>
            ) : (
              categories.map(category => (
                <div key={category._id} className="category-item">
                  <span>{category.name}</span>
                  <button 
                    onClick={() => onDelete(category._id)} 
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
          <form onSubmit={handleAdd} className="add-category-form">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category name"
              required
            />
            <button type="submit" className="add-btn">
              Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;