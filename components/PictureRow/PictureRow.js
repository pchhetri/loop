import React, { PropTypes } from 'react'
import s from './PictureRow.css'
import {IconButton} from 'react-mdl'

const PictureRow = ({name, detail, picURL, info, time, isHighPriority, actionButtons, value}) => {
  const minutesTextClass = isHighPriority ? s.redText : s.blackText
  return (
      <div className={s.rowContainer}>
          <div className={s.rowContent}>
          <img className={s.roomIcon} src={picURL}/>
          <div className={s.detailsTextContainer}>
            <span className={s.roomNameText}>{name}</span>
            <span className={s.roomDetailText}>{detail}</span>
            <span className={s.infoText}>{info}</span>
          </div>
          <span className={`${s.timeText} ${minutesTextClass}`}>{time}</span>
          {actionButtons.map((button, key) => renderActionButton(button,key, value))}
        </div>
      </div>
  )
}

// const renderHiddenRow = (data, secId, rowId, rowMap) => (
//   <div className={s.rowBack}>
//     <TouchableOpacity className={s.checkBtn} onPress={ () => onCheckedRow(data, secId, rowId, rowMap) }>
//       <Icon name="check" size={50} className={s.hiddenIcon} />
//     </TouchableOpacity>
//     <TouchableOpacity className={s.deleteBtn} onPress={ () => onSnoozedRow(data, secId, rowId, rowMap) }>
//     <Icon name="access-time" size={50} className={s.hiddenIcon} />
//     </TouchableOpacity>
//   </div>
// )

const renderActionButton = ({iconName, clickHandler, color}, key, value) => (
  <IconButton key={key} value={value} style={{color: color}} className={s.actionButton} name={iconName} onClick={clickHandler} />
)


export default PictureRow;
