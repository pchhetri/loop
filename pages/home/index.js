/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import {title, html} from './index.md';
import Welcome from '../../components/Welcome'
import Loader from '../../components/Loader'
import NewRequest from '../../components/NewRequest'
import RequestConfirmation from '../../components/RequestConfirmation'

class HomePage extends React.Component {

  componentDidMount() {
    document.title = title;
  }

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleCode(code)  {
    history.push(`/${code}`);
  }


  render() {
    return (
      <Layout className={s.content}>
        {/* <div dangerouslySetInnerHTML={{ __html: html }} /> */}
        <NewRequest onCode={this.handleCode.bind(this)}/>
      </Layout>
    );
  }

}

export default HomePage;
