import React from 'react'
import Layout from '../../components/Layout'
import {authenticate, currentUser} from '../../helpers/session'
import {streamRooms, fetchRoomsByIdAndLocation, updateRequestStatus, streamRoomsOff} from '../../core/firebaseApi'
import {DataTable, TableHeader, FABButton, Icon} from 'react-mdl'
import Loader from '../../components/Loader/Loader'
import moment from 'moment'
import s from './style.css'
import NewRoom from '../../components/NewRoom'

class Rooms extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: null, //TODO: populate with user
      rooms: null,
      numOfActiveRequests: 0,
      location: { //TODO: populate with acutal location
        created: 1479353675672,
        id: "-KWkLPlvltKizSvBJfN_",
        name: "College Library",
        organization_id: "-KWkLPlvltKizSvBJfNZ",
        updated: 1479353675672
      },
      activeTab: 0,
      openDialog: null
    }
    this.onRequestHandler = this.onRequestHandler.bind(this)
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  componentDidMount() {
    document.title = "NodaFi - Admin :: Rooms"
    streamRooms(this.state.location.id, this.onRequestHandler)
  }

  componentWillUnmount() {
    streamRoomsOff(this.onRequestHandler)
  }

  onRequestHandler(reqSnapshot) {
    const rooms = Object.values(reqSnapshot.val())
    this.setState({rooms: rooms})
  }

  handleOpenDialog() {
    this.setState({openDialog: true});
  }

  handleCloseDialog() {
    this.setState({openDialog: false});
  }

  render() {
    const user = currentUser()
    const rooms = this.state.rooms
    return (
      <Layout adminInfo={user}>
        {rooms
          ? renderRoomRows(rooms)
          : <Loader/>}
        <FABButton colored ripple className={s.addButton} onClick={this.handleOpenDialog}>
          <Icon name="add"/>
        </FABButton>
        {this.state.openDialog ? <NewRoom openDialog={this.state.openDialog} cancelDialog={this.handleCloseDialog}/> : null}
      </Layout>
    )
  }

}

const renderRoomRows = (rooms) => {
  return (
    <DataTable sortable shadow={3} className={s.table} rows={mapRooms(rooms)}>
      <TableHeader name="name" tooltip="Name of the room">Name</TableHeader>
      <TableHeader name="description" tooltip="Brief description of the room">Description</TableHeader>
      <TableHeader numeric name="pin" tooltip="The code the end-user will enter">PIN</TableHeader>
      <TableHeader numeric name="updated" tooltip="Time the room was last updated">Last Updated</TableHeader>
    </DataTable>
  )

}

const mapRooms = (rooms) => {
  const arr = rooms.map(room => {
    const obj = {}
    obj.name = room.name
    obj.description = room.detail
    obj.pin = room.pin
    obj.updated = moment(room.updated).utc().calendar()
    return obj
  })
  return arr
}

export default Rooms
