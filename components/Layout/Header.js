import React from 'react'
import Navigation from './Navigation'
import Link from '../Link'
import { IconButton, Menu, MenuItem ,Button } from 'react-mdl'
import s from './Header.css'

const Header = ({admin, menuOptions}) => {
    return (
      <header className={`mdl-layout__header ${s.header}`}>
          {admin ? renderAdminNavigation(admin.email, admin.name, menuOptions) : null}
      </header>
    )
}

const renderAdminNavigation = (name, email, menuOptions) => (
  <div className={`mdl-layout__header-row ${s.row}`}>
    <div>
      <Navigation />
    </div>
    <div className={s.accountSection}>
      <Link className={`mdl-layout-title ${s.title}`} to="/admin">
        <img className={s.icon} src='img/circle_person.png'/>
      </Link>
      <h6>{name}<br/>{email}</h6>
      {renderAdminMenu( menuOptions )}
    </div>
  </div>
)

const renderAdminMenu = (menuOptions) => (
  <div style={{position: 'relative'}}>
    <IconButton name="more_vert" id="demo-menu-lower-right" />
    <Menu target="demo-menu-lower-right" align="right">
        {menuOptions.map( (item, index)=> <MenuItem key={index} onClick={item.action}>{item.textFunction()}</MenuItem>)}
    </Menu>
</div>
)

export default Header;
