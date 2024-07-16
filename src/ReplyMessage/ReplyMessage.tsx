import React from 'react'
import './ReplyMessage.css'

import classNames from 'classnames'
import { IReplyMessageProps } from '../type'

const ReplyMessage: React.FC<IReplyMessageProps> = ({onClick, ...props}) => {
  return (
    <div
      className={classNames('HD_aichatbot-mbox-reply', {
        'HD_aichatbot-mbox-reply-border': !!props.titleColor,
      })}
      style={{ ...(props.titleColor && { borderColor: props.titleColor }) }}
      onClick={onClick}
    >
      <div className='HD_aichatbot-mbox-reply-left'>
        <div style={{ ...(props.titleColor && { color: props.titleColor }) }} className='HD_aichatbot-mbox-reply-owner'>
          {props.title || 'Unknown'}
        </div>
        <div className='HD_aichatbot-mbox-reply-message'>{props.message || '...'}</div>
      </div>
      {props.photoURL && (
        <div className='HD_aichatbot-mbox-reply-right'>
          <img src={props.photoURL} alt='' />
        </div>
      )}
    </div>
  )
}

export default ReplyMessage
