import React from 'react';
import './CategoryList.css';

function Category(props) {
  const { id, title, description, creatorId, creationDate } = props;

  return (
    <tr>
      <td>
        <span>{title}</span>
      </td>
      <td>
        <span>{description}</span>
      </td>
      <td>
        <span>{creatorId}</span>
      </td>
      <td>
        <span>{creationDate}</span>
      </td>
      <td>
        <div className="btn-inline-block">
          <div className="btn-wrapper">
            <div
              className="preview-btn"
              onClick={function () {
                /*do something with id*/
              }}
            ></div>
            <div
              className="edit-btn"
              onClick={function () {
                /*do something with id*/
              }}
            ></div>
            <div
              className="delete-btn"
              onClick={function () {
                /*do something with id*/
              }}
            ></div>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default Category;
