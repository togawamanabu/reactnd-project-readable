import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default function Header ({match, categories, setOrderbyScore, setOrderbyTimestamp, showButton=true}) {
  let buttons = <div className="orderby">
    <ul>
      <li><button className="orderby" onClick={setOrderbyTimestamp}>order by timestamp</button></li>
      <li><button className="orderby" onClick={setOrderbyScore}>order by score</button></li>
    </ul>
  </div>

    return (
      <div className='header'>
        <h2>Readable</h2>
        <div className="categoreis" >
        <ul className="nav">
          <li><Link to="/">Home</Link></li>
          {categories.map((cat) =>  <li key={cat.path}><Link to={cat.path}>{cat.name}</Link></li>)}
        </ul>
        </div>
        { showButton?buttons:null}
      </div>
    )
}
