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

const NewRequest = ({room, onRequest, onCheck}) => (
  <Card shadow={0} className={s.card}>
    <div className={`mdl-card__title mdl-card--expand ${s.cardTitle}`} style={{background: `url(${room.image_url}) center / cover`}}>
      <h2 className={`mdl-card__title-text ${s.cardTitleText}`}>{room.title}</h2>
    </div>
    <CardText>
      <p>Please select an issue.</p>
      <List className={s.list}>
        {room.default_requests.map(choice => eachChoice(choice, onCheck))}
        <Textfield onChange={() => {}} label="Additional Comments..." rows={4} className={s['text-field']}/>
      </List>
    </CardText>
    <CardActions border>
      <Button colored className={s.button} onClick={()=> onRequest('done')}>SUBMIT</Button>
    </CardActions>
  </Card>
)

const eachChoice = (choice, onCheck) => (
      <ListItem twoLine key={choice.id}>
        <ListItemContent subtitle={choice.detail}>{choice.description}</ListItemContent>
        <ListItemAction>
          <Checkbox ripple value={choice.id} onChange={choice => onCheck(choice)}/>
        </ListItemAction>
      </ListItem>
    )

export default NewRequest;
