import React from 'react';
import data from './MockCategories.json';
import './CategoryList.css';
import Category from './Category';

function CategoryList() {
  return (
    <>
      <div id="category-list">
        <header>
          <span>
            <b>Categories</b>
          </span>
        </header>
        <div id="section-wrapper">
          <div id="create-btn-section">
            <button id="create-btn">
              <b>CREATE NEW</b>
            </button>
          </div>
          <div id="category-section">
            <table>
              <tbody>
                <tr style={{ width: '100%' }}>
                  <th style={{ width: '15%' }}>
                    <span>Title</span>
                  </th>
                  <th style={{ width: '45%' }}>
                    <span>Description</span>
                  </th>
                  <th style={{ width: '15%' }}>
                    <span>Creator</span>
                  </th>
                  <th style={{ width: '10%' }}>
                    <span>Date</span>
                  </th>
                  <th style={{ width: '15%' }}>
                    <span>Actions</span>
                  </th>
                </tr>
                {data.categories.map((category) => (
                  <Category
                    key={category.id}
                    id={category.id}
                    title={category.title}
                    description={category.description}
                    creatorId={category.creatorId}
                    creationDate={category.creationDate}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryList;
