import React, { PropTypes } from 'react'
import s from './PictureRow.css'


const PictureRow = ({roomName, roomDetail, info, time}) => {
  const minutesTextClass = time < 35 ? s.blackText : s.redText
  return (
      <div className={s.rowContainer}>
        <img className={s.roomIcon} src='http://www.stanleyhotel.com/uploads/content-photos/lodge-room.jpg'/>
        <div className={s.detailsTextContainer}>
          <span className={s.roomNameText}>{roomName}</span>
          <span className={s.roomDetailText}>{roomDetail}</span>
          <span className={s.infoText}>{info.type}</span>
        </div>
        <span className={`${s.timeText} ${minutesTextClass}`}>{time} min ago</span>
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
