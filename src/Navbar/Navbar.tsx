import React from 'react'
import './Navbar.css'
import classNames from 'classnames'
import { INavbarProps } from '../type'

const Navbar: React.FC<INavbarProps> = ({ type = 'light', ...props }) => {
  return (
    <div className={classNames('HD_aichatbot-navbar', type, props.className)}>
      <div className='HD_aichatbot-navbar-item HD_aichatbot-navbar-item__left'>{props.left}</div>
      <div className='HD_aichatbot-navbar-item HD_aichatbot-navbar-item__center'>{props.center}</div>
      <div className='HD_aichatbot-navbar-item HD_aichatbot-navbar-item__right'>{props.right}</div>
    </div>
  )
}

export default Navbar
