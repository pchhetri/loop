/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright  2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
import Navigation from './Navigation'
import Link from '../Link'
import s from './Header.css'

const Header = ({name, email}) => {

    return (
      <header className={`mdl-layout__header ${s.header}`}>
          {window.location.pathname === "/" ? null : renderAdminNavigation(name, email)}
      </header>
    )
}

const renderAdminNavigation = (name, email) => (
  <div className={`mdl-layout__header-row ${s.row}`}>
    <div>
      <Navigation />
    </div>
    <div className={s.accountSection}>
      <Link className={`mdl-layout-title ${s.title}`} to="/">
        <img className={s.icon} src='img/circle_person.png'/>
      </Link>
      <h6>{name}<br/>{email}</h6>
    </div>
  </div>
)

export default Header;
