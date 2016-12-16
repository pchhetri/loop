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
  FABButton,
  Icon,
  Button
} from 'react-mdl'

const NewRequest = ({room, isChecked, onRequest, onCheck, value, handleTextChange}) => (
  <div>
  <Card shadow={0} className={s.card}>
    <div className={`mdl-card__title mdl-card--expand ${s.cardTitle}`} style={{background: `url(${room.image_url}) center / cover`}}>
      <h2 className={`mdl-card__title-text ${s.cardTitleText}`}>{room.name}</h2>
    </div>
    <CardText>
      <p>Please select an issue.</p>
      <List className={s.list}>
        {room.default_requests.map((choice, index) => eachChoice(choice, index, onCheck, isChecked[index]))}
        <ListItem value={room.default_requests.length} onClick={choice => onCheck(choice)}>
          <ListItemContent value={room.default_requests.length} >
            <Textfield value={value} onChange={handleTextChange} floatingLabel rows={2} label="Enter a custom issue..." className={s['text-field']}/>
          </ListItemContent>
          <ListItemAction>
            <Checkbox ripple value={room.default_requests.length} checked={value.length > 0}/>
          </ListItemAction>
        </ListItem>
      </List>
    </CardText>
  </Card>
    <FABButton className={s.fab} ripple accent onClick={()=> onRequest()}>
      <Icon name="send" />
    </FABButton>
  </div>
)

const eachChoice = (choice, index, onCheck, isChecked) => (
      <ListItem twoLine key={index} value={index} onClick={choice => onCheck(choice)}>
        <ListItemContent value={index} subtitle={choice.detail}>{choice.description}</ListItemContent>
        <ListItemAction>
          <Checkbox ripple value={index} checked={isChecked} onChange={choice => onCheck(choice)}/>
        </ListItemAction>
      </ListItem>
    )

export default NewRequest;
