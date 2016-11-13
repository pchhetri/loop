import React, { PropTypes } from 'react'
import s from './MetricText.css'

const MetricText = ({mainText="", subText=""}) => (
  <div className={s.metricText}>
    <span className={s.mainText}>{mainText}</span>
    <span className={s.subText}>{subText}</span>
  </div>
)

export default MetricText
