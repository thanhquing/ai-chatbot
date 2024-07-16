import React, { Key, useEffect, useState } from 'react'
import './ChatItem.css'

import Avatar from '../Avatar/Avatar'

import { format } from 'timeago.js'

import classNames from 'classnames'

import { MdVideoCall, MdVolumeOff, MdVolumeUp } from 'react-icons/md'
import { IChatItemProps } from '../type'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

const ChatItem: React.FC<IChatItemProps> = ({
  avatarFlexible = false,
  date = new Date(),
  unread = 0,
  statusColorType = 'badge',
  lazyLoadingImage = undefined,
  onAvatarError = () => void 0,
  ...props
}) => {
  const [onHoverTool, setOnHoverTool] = useState(false)
  const [onDrag, setOnDrag] = useState(false)

  useEffect(() => {
    props.setDragStates?.(setOnDrag)
  }, [])

  const handleOnMouseEnter = () => {
    setOnHoverTool(true)
  }

  const handleOnMouseLeave = () => {
    setOnHoverTool(false)
  }

  const handleOnClick = (e: React.MouseEvent) => {
    e.preventDefault()

    if (onHoverTool === true) return

    props.onClick?.(e)
  }

  const onDragOver = (e: React.MouseEvent) => {
    e.preventDefault()
    if (props.onDragOver instanceof Function) props.onDragOver(e, props.id)
  }

  const onDragEnter = (e: React.MouseEvent) => {
    e.preventDefault()
    if (props.onDragEnter instanceof Function) props.onDragEnter(e, props.id)
    if (!onDrag) setOnDrag(true)
  }

  const onDragLeave = (e: React.MouseEvent) => {
    e.preventDefault()
    if (props.onDragLeave instanceof Function) props.onDragLeave(e, props.id)
    if (onDrag) setOnDrag(false)
  }

  const onDrop = (e: React.MouseEvent) => {
    e.preventDefault()
    if (props.onDrop instanceof Function) props.onDrop(e, props.id)
    if (onDrag) setOnDrag(false)
  }

  const onExpandItem = (e: React.MouseEvent, id: string | number) => {
    e.preventDefault();
    e.stopPropagation();
    if (props.onExpandItem instanceof Function) props.onExpandItem(id);
  }

  return (
    <>
        <div
            key={props.id as Key}
            className={classNames('HD_aichatbot-container-citem', props.className)}
            onClick={handleOnClick}
            onContextMenu={props.onContextMenu}
        >
            <div className='HD_aichatbot-citem' onDragOver={onDragOver} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDrop}>
                {!!props.onDragComponent && onDrag && props.onDragComponent(props.id)}
                {((onDrag && !props.onDragComponent) || !onDrag) && [
                <div
                    key={'avatar'}
                    className={classNames('HD_aichatbot-citem-avatar', { 'HD_aichatbot-citem-status-encircle': statusColorType === 'encircle' })}
                >
                    <Avatar
                        src={props.avatar}
                        alt={props.alt}
                        className={statusColorType === 'encircle' ? 'HD_aichatbot-citem-avatar-encircle-status' : ''}
                        size={props.avatarSize || 'large'}
                        letterItem={props.letterItem}
                        sideElement={
                            props.statusColor ? (
                            <span
                                className='HD_aichatbot-citem-status'
                                style={
                                statusColorType === 'encircle'
                                    ? {
                                        border: `solid 2px ${props.statusColor}`,
                                    }
                                    : {
                                        backgroundColor: props.statusColor,
                                    }
                                }
                            >
                                {props.statusText}
                            </span>
                            ) : (
                            <></>
                            )
                        }
                        onError={onAvatarError}
                        lazyLoadingImage={lazyLoadingImage}
                        type={classNames('circle', { 'flexible': avatarFlexible })}
                    />
                    {props.subList && props.subList.length > 0 && (
                        <button className='HD_aichatbot-citem-expand-button' onClick={(e) => onExpandItem(e, props.id)}>
                            {props.expanded ? <FaArrowUp /> : <FaArrowDown />}
                        </button>
                    )}
                </div>,
                <div key={'HD_aichatbot-citem-body'} className='HD_aichatbot-citem-body'>
                    <div className='HD_aichatbot-citem-body--top'>
                    <div className='HD_aichatbot-citem-body--top-title'>{props.title}</div>
                    <div className='HD_aichatbot-citem-body--top-time'>{date && (props.dateString || format(date))}</div>
                    </div>

                    <div className='HD_aichatbot-citem-body--bottom'>
                    <div className='HD_aichatbot-citem-body--bottom-title'>{props.subtitle}</div>
                    <div className='HD_aichatbot-citem-body--bottom-tools' onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
                        {props.showMute && (
                        <div className='HD_aichatbot-citem-body--bottom-tools-item' onClick={props.onClickMute}>
                            {props.muted === true && <MdVolumeOff />}
                            {props.muted === false && <MdVolumeUp />}
                        </div>
                        )}
                        {props.showVideoCall && (
                        <div className='HD_aichatbot-citem-body--bottom-tools-item' onClick={props.onClickVideoCall}>
                            <MdVideoCall />
                        </div>
                        )}
                    </div>
                    <div className='HD_aichatbot-citem-body--bottom-tools-item-hidden-hover'>
                        {props.showMute && props.muted && (
                        <div className='HD_aichatbot-citem-body--bottom-tools-item'>
                            <MdVolumeOff />
                        </div>
                        )}
                    </div>
                    <div className='HD_aichatbot-citem-body--bottom-status'>{unread && unread > 0 ? <span>{unread}</span> : null}</div>
                    {props.customStatusComponents !== undefined ? props.customStatusComponents.map(Item => <Item />) : null}
                    </div>
                </div>,
                ]}
            </div>
        </div>
    </>
  )
}

export default ChatItem
