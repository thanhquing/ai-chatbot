import React from 'react'
import './SideBar.css'

import classNames from 'classnames'
import { ISideBarProps } from '../type'

const SideBar: React.FC<ISideBarProps> = ({ type = 'dark', ...props }) => {
  return (
    <div className={classNames('HD_aichatbot-sbar', type, props.data.className)}>
      <div className='HD_aichatbot-sbar-item'>{props.data?.top}</div>
      <div className='HD_aichatbot-sbar-item HD_aichatbot-sbar-item__center'>{props.data?.center}</div>
      <div className='HD_aichatbot-sbar-item'>{props.data?.bottom}</div>
    </div>
  )
}

export default SideBar
