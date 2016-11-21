import React from 'react'
import Navigation from './Navigation'
import Link from '../Link'
import { Button } from 'react-mdl'
import s from './Header.css'

const Header = ({admin, handleLogout}) => {
    return (
      <header className={`mdl-layout__header ${s.header}`}>
          {admin ? renderAdminNavigation(admin.email, admin.name, handleLogout) : null}
      </header>
    )
}

const renderAdminNavigation = (name, email, handleLogout) => (
  <div className={`mdl-layout__header-row ${s.row}`}>
    <div>
      <Navigation />
    </div>
    <div className={s.accountSection}>
      <Link className={`mdl-layout-title ${s.title}`} to="/admin">
        <img className={s.icon} src='img/circle_person.png'/>
      </Link>
      <h6>{name}<br/>{email}</h6>
      <Button style={{color: 'white'}} ripple onClick={handleLogout}>Logout</Button>
    </div>
  </div>
)

export default Header;
