import './ChatBubble.css';

import { useState } from 'react';
import { IoMdChatboxes, IoIosClose, IoIosSend } from 'react-icons/io';
import { IChatBubbleProps } from '../type';
import classNames from 'classnames';

const ChatBubble: React.FC<IChatBubbleProps> = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <div className="HD_aichatbot-float-bubble-container" onClick={handleClick}>
        {open ? (
          <IoIosClose width={32} size={32} color="#fff" />
        ) : (
          <IoMdChatboxes width={32} size={32} color="#fff" />
        )}
      </div>
      <div
        className={classNames('HD_aichatbot-float-bubble-chatbox-container', {
          open,
        })}
      >
        <div className="HD_aichatbot-float-bubble-chatbox-header">
          <img
            className="HD_aichatbot-float-bubble-chatbox-avatar"
            src="https://i.pravatar.cc/100"
            width={64}
            height={64}
          />
          <h1 className="HD_aichatbot-float-bubble-chatbox-title">AI Supporter</h1>
        </div>
        <div className="HD_aichatbot-float-bubble-chatbox-body"></div>
        <div className="HD_aichatbot-float-bubble-chatbox-actions">
          <textarea
            className="HD_aichatbot-float-bubble-chatbox-chat-input"
            placeholder="Type your message"
          ></textarea>
          <IoIosSend className="HD_aichatbot-float-bubble-chatbox-chat-send-icon" />
        </div>
      </div>
    </>
  );
};

export default ChatBubble;
