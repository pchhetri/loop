import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import s from './NewRoom.css'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Textfield,
  RadioGroup,
  Radio
} from 'react-mdl'
import {fetchRoomTypes, fetchRoomCodes} from '../../core/firebaseApi'
import Loader from '../../components/Loader'

{/* Cancel event is emitted when the user clicks "Escape" key while the modal is open.
    It doesn't do anything by default.*/
}
class NewRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomTypes: null
    }
    this.onRoomTypeHandler = this.onRoomTypeHandler.bind(this)
    this.onRoomCodeHandler = this.onRoomCodeHandler.bind(this)
    this.eachRoomType = this.eachRoomType.bind(this)
  }

  componentDidMount() {
    fetchRoomTypes(this.onRoomTypeHandler)
    fetchRoomCodes(this.onRoomCodeHandler)
  }

  onRoomTypeHandler(data) {
    const roomTypes = Object.values(data.val());
    this.setState({roomTypes: roomTypes})
  }

  onRoomCodeHandler(data) {
    var roomCodes = Object.values(data.val());
    roomCodes = roomCodes.map(function(el) {
      return (el.pin);
    });
    this.setState({roomCodes: Math.max(...roomCodes)})
    console.log(this.state.roomCodes);
    console.log(roomCodes);
  }

  eachRoomType(roomType) {
    return (
      <Radio value={roomType.id} key={roomType.id}>
        {roomType.type}</Radio>
    )
  }

  cancel() {
    this.props.cancelDialog()
  }

  create() {
    const formData = {
      name: this.refs.roomName.inputRef.value,
      detail: this.refs.roomDescription.inputRef.value,
      default_requests: this.state.roomTypes.find(function(o) {
        return o.id === this.state.roomTypeSel
      }, this),
      image_url: '',
      location_id: ''
    };
    console.log(formData);
    // console.log(this.state.roomTypes);
  }

  selection(e) {
    this.setState({roomTypeSel: e.currentTarget.value})
  }

  render() {
    if (this.state.roomTypes) {
      return (
        <div>
          <Dialog open={this.props.openDialog}>
            <DialogTitle>New Room</DialogTitle>
            <DialogContent>
              <p>Please fill out the fields below to create a new room.</p>
              <Textfield onChange={() => {}} ref="roomName" label="Name..." floatingLabel required style={{
                width: '200px'
              }}/>
              <Textfield onChange={() => {}} ref="roomDescription" label="Description..." floatingLabel style={{
                width: '200px'
              }}/>
              <label className="mdl-select__label">Room Type</label>
              <RadioGroup container="ul" name="roomType" value="foobar" onChange={this.selection.bind(this)}>
                {this.state.roomTypes.map(this.eachRoomType)}
              </RadioGroup>
            </DialogContent>
            <DialogActions>
              <Button type='button' onClick={this.create.bind(this)}>Create</Button>
              <Button type='button' onClick={this.cancel.bind(this)}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    } else {
      return null
    }
  }
}

export default NewRoom;
