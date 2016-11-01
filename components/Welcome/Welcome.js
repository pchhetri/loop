import React, {PropTypes} from 'react';
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

  submit(){
    var val = this.refs.roomCode.inputRef.value;
    alert('Room code entered was: ' + val);
  }
  render() {
    return (
      <Card shadow={0} className={s.card}>
        <CardTitle style={{
          color: '#000',
          height: '176px',
          background: 'url("/img/welcome.jpg") center / cover'
        }}>Welcome to LOOP!</CardTitle>
        <CardText>
          We make submitting issues with a building or facility <i>really</i> easy.
          Simply enter your code below!
        </CardText>
        <CardActions border>
          <Textfield onChange={() => {}} ref="roomCode" pattern="-?[0-9]*(\.[0-9]+)?"
          error="Input is not a number!" label="Number..." style={{
            width: '200px'
          }}/>
          <Button colored onClick={this.submit.bind(this)}>SUBMIT</Button>
        </CardActions>
      </Card>
    )
  }

}

export default Welcome;
