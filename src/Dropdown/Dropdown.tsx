import React, { useState } from 'react'
import './Dropdown.css'
import classNames from 'classnames'
import Button from '../Button/Button'
import { IDropdownProps, IDropdownItemType } from '../type'

const Dropdown: React.FC<IDropdownProps> = ({ animationPosition = 'nortwest', animationType = 'default', ...props }) => {
  const [show, setShow] = useState<boolean | undefined>(undefined)

  const onBlur = () => {
    if (show === true) setShow(false)
  }

  return (
    <div className={classNames('HD_aichatbot-dropdown-container', props.className)} onBlur={onBlur}>
      {<Button {...props.buttonProps} onClick={() => setShow(!show)} />}
      <div
        className={classNames(
          'HD_aichatbot-dropdown',
          animationType,
          'HD_aichatbot-dropdown-open__' + animationPosition,
          { 'dropdown-hide': show === false },
          { 'dropdown-show': show === true }
        )}
      >
        <ul>
          {props.title && <span className='HD_aichatbot-dropdown-title'>{props.title}</span>}
          {props.items?.map((x: IDropdownItemType, i: number) => (
            <li key={i} onMouseDown={e => props.onSelect(i)}>
              {x instanceof Object ? (
                x.icon ? (
                  <span className='HD_aichatbot-button-icon--container'>
                    {(x.icon.float === 'right' || !x.icon.float) && <a>{x.text}</a>}

                    <span
                      style={{ float: x.icon.float, color: x.icon.color, fontSize: x.icon.size || 12 }}
                      className={classNames('HD_aichatbot-button-icon', x.icon.className)}
                    >
                      {x.icon.component}
                    </span>

                    {x.icon.float === 'left' && <a>{x.text}</a>}
                  </span>
                ) : (
                  <a>{x.text}</a>
                )
              ) : (
                <a>{x}</a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Dropdown
