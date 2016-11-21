import React from 'react';
import {
  Card,
  CardTitle,
  CardText,
  CardMenu,
  CardActions,
  IconButton,
  Button,
  Textfield
} from 'react-mdl';
import s from './Welcome.css'

class Welcome extends React.Component {

  submit() {

    var val = this.refs.roomCode.inputRef.value;
    this.props.onCode(val)
  }
  render() {
    return (
      <Card shadow={0} className={s.card}>
        <CardTitle style={{
          color: '#000',
          height: '176px',
          background: 'url("/img/welcome.jpg") center / cover'
        }}>Welcome to NodaFi!</CardTitle>
        <CardText>
          We make submitting issues with a building or facility&nbsp;<i>really</i>&nbsp;easy. Simply enter the room code below!
        </CardText>
        <CardActions border>
          <div className={s['center-div']}>
            <Textfield onChange={() => {}} type="number" ref="roomCode" pattern="-?[0-9]*(\.[0-9]+)?" error="Input is not a number!" label="Number..." style={{
              width: '200px'
            }}/>
            <br />
            <Button colored onClick={this.submit.bind(this)}>SUBMIT</Button>
          </div>
        </CardActions>
      </Card>
    )
  }

}

export default Welcome;
