import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import {ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import {grey50} from 'material-ui/styles/colors'

export default function Header ({match, categories, setOrderbyScore, setOrderbyTimestamp, showButton=true}) {
  // let buttons = <div className="orderby">
  //   <ul>
  //     <li><button className="orderby" onClick={setOrderbyTimestamp}>order by timestamp</button></li>
  //     <li><button className="orderby" onClick={setOrderbyScore}>order by score</button></li>
  //   </ul>
  // </div>

  let categoreis = <ToolbarGroup>
     <RaisedButton label="Home"   containerElement={<Link to="/" />} />
     {categories.map((cat) =>  <RaisedButton label={cat.name} key={cat.path} containerElement={<Link to={cat.path} />} />)}
     <ToolbarSeparator />
     <IconButton onClick={setOrderbyTimestamp}>
       <FontIcon color={grey50} className="material-icons">&#xE923;</FontIcon>
     </IconButton>
     <IconButton onClick={setOrderbyScore}>
       <FontIcon color={grey50} className="material-icons">&#xE87D;</FontIcon>
     </IconButton>
  </ToolbarGroup>

    return (
      <div className='header'>
        <AppBar title="Readable" iconElementLeft={(<div />)} iconElementRight={categoreis} />

      </div>
    )
}
