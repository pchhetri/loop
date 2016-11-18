import React, { PropTypes } from 'react'
import s from './PictureRow.css'


const PictureRow = ({name, detail, picURL, info, time, isHighPriority}) => {
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

const onCheckedRow = (data, secId, rowId) => {
  alert("You checked " + rowId)
}

const onSnoozedRow = (data, secId, rowId) => {
  alert("You snoozed " + rowId)
}


export default PictureRow;
