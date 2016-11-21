import React from 'react'
import Layout from '../../components/Layout'
import RequestConfirmation from '../../components/RequestConfirmation'
import history from '../../core/history'



class ConfirmationPage extends React.Component {

  constructor(props) {
    super(props)
  }


  componentDidMount() {
  }


  render() {
    return (
      <Layout>
        <RequestConfirmation/>
      </Layout>
    )
  }

}

export default ConfirmationPage
