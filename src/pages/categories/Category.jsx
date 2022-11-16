import React, { useState } from 'react';
import CategoryEdit from './CategoryEdit';
import './CategoryList.css';

function Category(props) {
  const { id, title, description, creatorId, creationDate } = props;
  const [titleState, setTitleState] = useState(title);
  const [descriptionState, setDescriptionState] = useState(description);
  function handleEditClick() {
    console.log('open');
    return <CategoryEdit />;
  }

  return (
    <tr>
      <td>
        <span>{titleState}</span>
      </td>
      <td>
        <span>{descriptionState}</span>
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
            <CategoryEdit
              titleOld={titleState}
              setTitleOld={setTitleState}
              descriptionOld={descriptionState}
              setDescriptionOld={setDescriptionState}
            />
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
