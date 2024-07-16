import React, { FC, useState } from 'react'
import './MeetingMessage.css'

import { FaCalendar, FaCaretDown, FaCaretRight } from 'react-icons/fa'
import { HiOutlineVideoCamera } from 'react-icons/hi'
import { IoMdChatboxes } from 'react-icons/io'
import { MdMoreHoriz } from 'react-icons/md'

import { format } from 'timeago.js'

import Avatar from '../Avatar/Avatar'
import Dropdown from '../Dropdown/Dropdown'

import classNames from 'classnames'
import { IMeetingMessageProps, MeetingMessageEvent } from '../type'

const MeetingMessage: FC<IMeetingMessageProps> = ({
  date,
  dateString,
  title,
  subject,
  collapseTitle,
  moreItems,
  participants,
  dataSource,

  onClick,
  onMeetingTitleClick,
  onMeetingVideoLinkClick,
  onMeetingMoreSelect,
  ...props
}) => {
  const [toogle, setToogle] = useState(false)

  const PARTICIPANT_LIMIT = props.participantsLimit
  const dateText = dateString ? dateString : date && format(date)

  const _onMeetingLinkClick: MeetingMessageEvent = (item, index, event) => {
    if (onMeetingTitleClick instanceof Function) onMeetingTitleClick(item, index, event)
  }

  const _onMeetingVideoLinkClick: MeetingMessageEvent = (item, index, event) => {
    if (onMeetingVideoLinkClick instanceof Function) onMeetingVideoLinkClick(item, index, event)
  }

  const toggleClick = () => {
    setToogle(!toogle)
  }

  return (
    <div className='HD_aichatbot-mbox-mtmg'>
      <div className='HD_aichatbot-mtmg'>
        <div className='HD_aichatbot-mtmg-subject'>{subject || 'Unknown Meeting'}</div>
        <div className='HD_aichatbot-mtmg-body' onClick={onClick}>
          <div className='HD_aichatbot-mtmg-item'>
            <FaCalendar />
            <div className='HD_aichatbot-mtmg-content'>
              <span className='HD_aichatbot-mtmg-title'>{title}</span>
              <span className='HD_aichatbot-mtmg-date'>{dateText}</span>
            </div>
          </div>

          {onMeetingMoreSelect && moreItems && moreItems.length > 0 && (
            <div>
              <Dropdown
                animationType='bottom'
                animationPosition='norteast'
                buttonProps={{
                  className: 'HD_aichatbot-mtmg-right-icon',
                  icon: {
                    component: <MdMoreHoriz />,
                    size: 24,
                  },
                }}
                items={moreItems}
                onSelect={onMeetingMoreSelect}
              />
            </div>
          )}
        </div>
        <div className='HD_aichatbot-mtmg-body-bottom' onClick={toggleClick}>
          {toogle === true ? (
            <div className='HD_aichatbot-mtmg-bottom--tptitle'>
              <FaCaretDown />
              <span>{collapseTitle}</span>
            </div>
          ) : (
            <div className='HD_aichatbot-mtmg-body-bottom--bttitle'>
              <FaCaretRight />
              <span>
                {participants
                  ?.slice(0, PARTICIPANT_LIMIT)
                  .map(x => x.title || 'Unknow')
                  .join(', ')}
                {participants &&
                  PARTICIPANT_LIMIT &&
                  participants.length > PARTICIPANT_LIMIT &&
                  `, +${participants.length - PARTICIPANT_LIMIT}`}
              </span>
            </div>
          )}
        </div>
        <div className={classNames('HD_aichatbot-mtmg-toogleContent', { 'HD_aichatbot-mtmg-toogleContent--click': toogle === true })}>
          {dataSource &&
            dataSource.map((x, i) => {
              return (
                <div key={i}>
                  {!x.event && (
                    <div className='HD_aichatbot-mitem'>
                      <div className={classNames('HD_aichatbot-mitem avatar', { 'HD_aichatbot-mitem no-avatar': !x.avatar })}>
                        {x.avatar ? <Avatar src={x.avatar} /> : <IoMdChatboxes />}
                      </div>
                      <div className='HD_aichatbot-mitem-body'>
                        <div className='HD_aichatbot-mitem-body--top'>
                          <div
                            className='HD_aichatbot-mitem-body--top-title'
                            onClick={(e: React.MouseEvent<HTMLElement>) => _onMeetingLinkClick(x, i, e)}
                          >
                            {x.title}
                          </div>
                          <div className='HD_aichatbot-mitem-body--top-time'>
                            {x.dateString ? x.dateString : x.date && x.date && format(x.date)}
                          </div>
                        </div>
                        <div className='HD_aichatbot-mitem-body--bottom'>
                          <div className='HD_aichatbot-mitem-body--bottom-title'>{x.message}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {x.event && (
                    <div className='HD_aichatbot-mitem-event'>
                      <div className='HD_aichatbot-mitem-bottom-body'>
                        <div className='HD_aichatbot-mitem-body avatar'>
                          <HiOutlineVideoCamera />
                        </div>
                        <div className='HD_aichatbot-mitem-bottom-body-top'>
                          {x.event.title}
                          <div className='HD_aichatbot-mitem-body--top-time'>{x.dateString ? x.dateString : x.date && format(x.date)}</div>
                          <div className='HD_aichatbot-mitem-avatar-content'>
                            {
                              <div className='HD_aichatbot-mitem-avatar'>
                                {x.event.avatars &&
                                  // x.event.avatars.slice(0, x.event.avatarsLimit).map((x, i) => x instanceof Avatar ? x : (
                                  x.event.avatars.slice(0, x.event.avatarsLimit).map((x, i) => <Avatar key={i} src={x.src} />)}
                                {x.event.avatars && x.event.avatarsLimit && x.event.avatars.length > x.event.avatarsLimit && (
                                  <div
                                    className='HD_aichatbot-mitem-length HD_aichatbot-mitem-tooltip'
                                    tooltip={x.event.avatars
                                      .slice(x.event.avatarsLimit, x.event.avatars.length)
                                      .map(avatar => avatar.title)
                                      .join(',')
                                      .toString()}
                                  >
                                    <span className='HD_aichatbot-mitem-tooltip-text'>
                                      {'+' + (x.event.avatars.length - x.event.avatarsLimit)}
                                    </span>
                                  </div>
                                )}
                              </div>
                            }
                          </div>
                          {x.record && (
                            <div className='HD_aichatbot-mtmg-call-record'>
                              <div className='HD_aichatbot-mtmg-call-body'>
                                <div
                                  onClick={(e: React.MouseEvent<HTMLElement>) => _onMeetingVideoLinkClick(x, i, e)}
                                  className='HD_aichatbot-mtmg-call-avatars'
                                >
                                  <Avatar className={'HD_aichatbot-mtmg-call-avatars'} src={x.record.avatar} />
                                  <div className={'HD_aichatbot-mtmg-record-time'}>{x.record.time}</div>
                                </div>
                                <div className='HD_aichatbot-mtmg-call-body-title'>
                                  <span>{x.record.title}</span>
                                  <div className='HD_aichatbot-mtmg-call-body-bottom'>{x.record.savedBy}</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default MeetingMessage
