import React from 'react';
import s from './RequestConfirmation.css';
import {
  Card,
  CardTitle,
  CardText,
  CardActions,
  Button
} from 'react-mdl'

class RequestConfirmation extends React.Component {
  static propTypes = {}

  constructor(props) {
    super(props)
    this.state = props.room
  }

  submit()
  {
    window.location = '/';
  }

  render() {
    return (
      <Card shadow={0} className={s.card}>
        <div className={`mdl-card__title mdl-card--expand ${s.cardTitle}`}>
          <div className={s['center-div']}>
            <i className={`material-icons ${s['check-icon']}`}>check_circle</i>
            <h2 className={`mdl-card__title-text ${s.cardTitleText}`}>Request created!</h2>
          </div>
        </div>
        <CardText>
          Thank you for submiiting this request! Your request will be reviewed by a building personnel as soon as possible.
        </CardText>
        <CardActions border className={s.cardActions}>
          <div className={s['center-div']}>
            <Button colored className={s.button} onClick={this.submit.bind(this)}>CREATE ANOTHER REQUEST</Button>
          </div>
        </CardActions>
      </Card>
    )
  }
}

export default RequestConfirmation;
