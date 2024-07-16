import { FC } from 'react'
import './MeetingLink.css'

import { IMeetingLinkMessageProps, MeetingLinkActionButtons } from '../type'

const MeetingLink: FC<IMeetingLinkMessageProps> = props => {
  return (
    <div className='HD_aichatbot-mtlink'>
      <div className='HD_aichatbot-mtlink-content'>
        <div className='HD_aichatbot-mtlink-item'>
          <div className='HD_aichatbot-mtlink-title'>{props.text}</div>
        </div>
        <div className='HD_aichatbot-mtlink-btn'>
          {props?.actionButtons?.map((Item: MeetingLinkActionButtons) => {
            return (
              <div className='HD_aichatbot-mtlink-btn-content' onClick={() => Item.onClickButton(props?.meetingID ?? '')}>
                <Item.Component />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MeetingLink
