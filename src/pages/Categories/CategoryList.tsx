import React from 'react'
import data from './MockCategories.json'
import './CategoryList.css'


function CategoryList() {   
  return (
    <div id="wrapper">
    <header>
        <span>i am header</span>
    </header>
    <div id="content">
      <div id="category-list">
        <header>
          <span><b>Categories</b></span>
        </header>
        <div id="create-btn-section">
        <button id="create-btn"><b>CREATE NEW</b></button>
        </div>
        <div id="category-section">
          <table>
            <tbody>
              <tr style={{width:"100%"}}>
                <th style={{width:"15%"}}><span>Title</span></th>
                <th style={{width:"50%"}}><span>Description</span></th>
                <th style={{width:"15%"}}><span>Creator</span></th>
                <th style={{width:"10%"}}><span>Date</span></th>
                <th style={{width:"10%"}}><span>Actions</span></th>
              </tr>
              <tr>
                <td><span>INTERCAL</span></td>
                <td><span>Uždaviniai, susiję su programavimo kalba INTERCAL.</span></td>
                <td><span>Jonas Jonaitis</span></td><td><span>2020-10-10</span></td>
                <td><div className="btn-wrapper"><div className="preview-btn"></div><div className="edit-btn"></div><div className="delete-btn"></div></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <footer>
        <span>i am footer</span>
    </footer>
    </div>
    
  )
}

export default CategoryList