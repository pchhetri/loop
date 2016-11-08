/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
import Layout from '../../components/Layout'
import s from './styles.css'
import { title, html } from './index.md'
import ContentCard from '../../components/ContentCard/ContentCard'
import PictureRow from '../../components/PictureRow/PictureRow'
import Footer from '../../components/Footer/Footer'
import colors from '../../constants/colors'
import MetricText from '../../components/MetricText/MetricText'

const smallContentCards = [
  {
    title: 'Issues Solved Today',
    color: colors.brightGreen,
    iconName: "check",
    data: 7,
    unit: "",
  },
  {
    title: 'Average Response Time',
    color: colors.lightTeal,
    iconName: "check",
    data: 21.5,
    unit: "min",
  },
  {
    title: 'Current Active Issues',
    color: colors.lightBlue,
    iconName: "check",
    data: 5,
    unit: "",
  },
  {
    title: 'Issues Soved Today',
    color: colors.brightGreen,
    iconName: "check",
    data: 2,
    unit: "",
  },
]

const activeRequests = [
  {
    roomName: "Women's Restroom",
    roomDetail: "Room 1762",
    info: {status: 0, type: "Overflowing Trash Cans", comments: ""},
    time: 6
  },
  {
    roomName: "Men's Locker Room",
    roomDetail: "First Floor",
    info: {status: 0, type: "Out of Towels", comments: "I'm in the men's locker room and there aren't any clean towels in here..."},
    time: 12
  },
  {
    roomName: "Fitness Center",
    roomDetail: "Room A",
    info: {status: 0, type: "Dirty yoga mats/ wash towels", comments: ""},
    time: 51
  },
  {
    roomName: "Fitness Center",
    roomDetail: "Snoozing Room",
    info: {status: 1, type: "Dirty yoga mats/ wash towels", comments: ""},
    time: 52
  },
  {
    roomName: "Fitness Center",
    roomDetail: "Satisfing Room",
    info: {status: 2, type: "Dirty yoga mats/ wash towels", comments: ""},
    time: 59
  },
]

class AdminPage extends React.Component {

  componentDidMount() {
    document.title = title
  }

  render() {
    return (
      <Layout className={s.content}>
        <div className={s.smallCardContainer}>
          {smallContentCards.map(renderSmallCards)}
        </div>
        <div className={s.largeCardContainer}>
          {renderLargeCard('Requests By Room', colors.brightGreen, "check")}
          {renderActiveRequests('Currently Active Issues', colors.redMedium, "check")}
        </div>
      </Layout>
    )
  }
}

const renderSmallCards = ({title, color, iconName, data, unit}, key) => (
  <div key={key} className={s.smallCard}>
    <ContentCard title={title} color={color} iconName={iconName}>
      <MetricText mainText={data} subText={unit}/>
    </ContentCard>
  </div>
)

const renderLargeCard = ({title, color, iconName}) => (
  <div className={s.largeCard}>
    <ContentCard title={title} color={color} iconName={iconName}>
    </ContentCard>
  </div>
)

const renderActiveRequests = ({title, color, iconName}) => (
  <div className={s.largeCard}>
    <ContentCard title={title} color={color} iconName={iconName}>
      <div className='' />
      {activeRequests.map((request, key) => <PictureRow key={key}
                                                        info={request.info}
                                                        roomDetail={request.roomDetail}
                                                        roomName={request.roomName}
                                                        time={request.time}/>
                                                      )}
      <div/>
    </ContentCard>
  </div>
)

export default AdminPage
