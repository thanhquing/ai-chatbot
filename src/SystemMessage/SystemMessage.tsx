import React from 'react'
import './SystemMessage.css'

import classNames from 'classnames'
import { ISystemMessageProps } from '../type'

const SystemMessage: React.FC<ISystemMessageProps> = props => {
  return (
    <div className={classNames('HD_aichatbot-container-smsg', props.className)}>
      <div className='HD_aichatbot-smsg'>
        <div className='HD_aichatbot-smsg-text'>{props.text}</div>
      </div>
    </div>
  )
}

export default SystemMessage
