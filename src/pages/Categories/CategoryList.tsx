import React from 'react'
import data from './MockCategories.json'
import './CategoryList.css'
import Category, {CreateCategory} from './Category.jsx'
import {Link} from 'react-router-dom'


function CategoryList() {   

  return (
    <>
    <header>
          <span>i am header</span><br/>
          <nav>
          <Link to={"/"}>home</Link><br/>
          <Link to={"/categorylist"}>categories</Link><br/>
          </nav>
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
              {data.categories.map(category=><CreateCategory id={category.id} title={category.title} description={category.description} creatorId={category.creatorId} creationDate={category.creationDate}/>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <footer>
        <span>i am footer</span>
    </footer>
    </>
  )
}


export default CategoryList