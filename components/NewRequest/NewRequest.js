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

const NewRequest = ({room, onRequest}) => (
  <Card shadow={0} className={s.card}>
    <div className={`mdl-card__title mdl-card--expand ${s.cardTitle}`}>
      <h2 className={`mdl-card__title-text ${s.cardTitleText}`}>{this.state.name}</h2>
    </div>
    <CardText>
      <p>Please select an issue.</p>
      <List className={s.list}>
        {rooms.default_requests.map(eachChoice)}
        <Textfield onChange={() => {}} label="Additional Comments..." rows={4} className={s['text-field']}/>
      </List>
    </CardText>
    <CardActions border>
      <Button colored className={s.button} onClick={()=> onRequest('done')}>SUBMIT</Button>
    </CardActions>
  </Card>
)

const eachChoice = (choice) => (
      <ListItem twoLine key={choice.id}>
        <ListItemContent subtitle={choice.detail}>{choice.description}</ListItemContent>
        <ListItemAction>
          <Checkbox/>
        </ListItemAction>
      </ListItem>
    )

export default NewRequest;
