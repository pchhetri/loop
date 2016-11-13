import React from 'react';
import s from './NewRequest.css';
import {
  List,
  ListItem,
  ListItemContent,
  ListItemAction,
  Checkbox,
  Textfield,
  Card,
  CardTitle,
  CardText,
  CardActions,
  Button
} from 'react-mdl'

class NewRequest extends React.Component {
  static propTypes = {}

  constructor(props) {
    super(props)
    this.state = props.room
  }

  eachChoice(choice) {
    return (
      <ListItem twoLine key={choice.id}>
        <ListItemContent subtitle={choice.description}>{choice.title}</ListItemContent>
        <ListItemAction>
          <Checkbox/>
        </ListItemAction>
      </ListItem>
    )
  }

  submit()
  {
    this.props.onRequest('done')
  }

  render() {
    return (
      <Card shadow={0} className={s.card}>
        <div className={`mdl-card__title mdl-card--expand ${s.cardTitle}`}>
          <h2 className={`mdl-card__title-text ${s.cardTitleText}`}>{this.state.name}</h2>
        </div>
        <CardText>
          <p>Please select an issue.</p>
          <List className={s.list}>
            {this.state.issues.map(this.eachChoice)}
            <Textfield onChange={() => {}} label="Additional Comments..." rows={4} className={s['text-field']}/>
          </List>
        </CardText>
        <CardActions border>
          <Button colored className={s.button} onClick={this.submit.bind(this)}>SUBMIT</Button>
        </CardActions>
      </Card>
    )
  }

}

export default NewRequest;
