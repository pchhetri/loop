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

const NewRequest = ({room, onRequest, onCheck, value, handleTextChange}) => (
  <Card shadow={0} className={s.card}>
    <div className={`mdl-card__title mdl-card--expand ${s.cardTitle}`} style={{background: `url(${room.image_url}) center / cover`}}>
      <h2 className={`mdl-card__title-text ${s.cardTitleText}`}>{room.title}</h2>
    </div>
    <CardText>
      <p>Please select an issue.</p>
      <List className={s.list}>
        {room.default_requests.map((choice, index) => eachChoice(choice, index, onCheck))}
        <Textfield value={value} onChange={handleTextChange} floatingLabel rows={2} label="Other issue..." className={s['text-field']}/>
      </List>
    </CardText>
    <CardActions border>
      <Button colored className={s.button} onClick={()=> onRequest()}>SUBMIT</Button>
    </CardActions>
  </Card>
)

const eachChoice = (choice, index, onCheck) => (
      <ListItem twoLine key={index}>
        <ListItemContent subtitle={choice.detail}>{choice.description}</ListItemContent>
        <ListItemAction>
          <Checkbox ripple value={index} onChange={choice => onCheck(choice)}/>
        </ListItemAction>
      </ListItem>
    )

export default NewRequest;
