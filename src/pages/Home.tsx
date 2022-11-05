import React from 'react'
import {Link} from 'react-router-dom'

import './Categories/CategoryList.css' // <- ištrink mane, kai bus sukurta antraštė ir poraštė

function Home() {
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
          <span>Hello world</span>
        </div>
        <footer>
          <span>i am footer</span>
        </footer>
    </>
    
  )
}

export default Home