import React from 'react'
import data from './MockCategories.json'
import './CategoryList.css';

class Category extends React.Component{
  render(){
    const {id, title, description, creatorId, creationDate} = this.props;
    return(
      <tr>
        <td><span>{title}</span></td>
        <td><span>{description}</span></td>
        <td><span>{creatorId}</span></td>
        <td><span>{creationDate}</span></td>
        <td>
          <div className="btn-inline-block">
            <div className="btn-wrapper">
              <div className="preview-btn" onClick={function(){/*do something with id*/}}></div>
              <div className="edit-btn" onClick={function(){/*do something with id*/}}></div>
              <div className="delete-btn" onClick={function(){/*do something with id*/}}></div>
            </div>
          </div>
        </td>
      </tr>
    )
  }
}

export function CreateCategory(props) {
  const {id, title, description, creatorId, creationDate} = props;
   
  return(
    <tr>
      <td><span>{title}</span></td>
      <td><span>{description}</span></td>
      <td><span>{creatorId}</span></td>
      <td><span>{creationDate}</span></td>
      <td>
        <div className="btn-inline-block">
          <div className="btn-wrapper">
            <div className="preview-btn" onClick={function(){/*do something with id*/}}></div>
            <div className="edit-btn" onClick={function(){/*do something with id*/}}></div>
            <div className="delete-btn" onClick={function(){/*do something with id*/}}></div>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default Category