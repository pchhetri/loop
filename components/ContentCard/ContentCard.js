/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react'
import s from './ContentCard.css'

const ContentCard = ({title="", iconName="face", color="#5271C2", header, children}) => (
  <div className={s.card}>
    <div className={s.header} style={{backgroundColor: color}}>
      <span className={`material-icons ${s.icon}`}>{iconName}</span>
      <span className={s.titleText}>{title}</span>
    </div>
    {header ? header : null}
    <div className={s.content}>
      {children}
    </div>
  </div>
)

export default ContentCard
