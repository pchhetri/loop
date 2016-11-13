/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';
import Header from './Header';
import Footer from '../Footer';
import s from './Layout.css';

class AdminLayout extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
      <div className="mdl-layout mdl-js-layout" ref={node => (this.root = node)}>
        <div className={`mdl-layout__inner-container ${s.container}`}>
          <div className={s.header}>
            <Header name="John Doe"
                    email="johndoe@example.com"
             />
           </div>
            <div {...this.props} className={s.content} />
        </div>
      </div>
    );
  }
}

export default AdminLayout;
