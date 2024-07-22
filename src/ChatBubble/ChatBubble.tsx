import './ChatBubble.css';

import { useCallback, useState } from 'react';
import { IoMdChatboxes, IoIosClose, IoIosSend } from 'react-icons/io';
import { IChatBubbleProps } from '../type';
import classNames from 'classnames';
import MessageList from '../MessageList/MessageList';
import { useForm } from 'react-hook-form';

const ChatBubble: React.FC<IChatBubbleProps> = () => {
  const [open, setOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [messageList, setMessageList] = useState([
    {
      position: 'left',
      type: 'text',
      text: 'Give me a message list example !',
    },
    {
      position: 'right',
      type: 'text',
      text: "That's all.",
    },
  ] as any[]);

  const { register, handleSubmit, reset } = useForm();

  const handleVisualThinking = useCallback(() => {
    setIsThinking((prev) => !prev);
    setTimeout(() => setIsThinking((prev) => !prev), 2000);
  }, [setIsThinking]);

  const handleClick = useCallback(() => {
    setOpen((prev) => !prev);
  }, [setOpen]);

  const handleFormSubmit = useCallback(
    (data: any) => {
      if (!data.message) return;
      setMessageList((prevMsg) => {
        prevMsg.push({
          position: 'right',
          type: 'text',
          text: data.message,
        });
        return prevMsg;
      });
      reset();
      handleVisualThinking();
    },
    [setMessageList]
  );

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
          <div className="HD_aichatbot-float-bubble-chatbox-info">
            <h1 className="HD_aichatbot-float-bubble-chatbox-subtitle">Chat with</h1>
            <h1 className="HD_aichatbot-float-bubble-chatbox-title">AI Agent</h1>
          </div>
        </div>
        <div className="HD_aichatbot-float-bubble-chatbox-body">
          <MessageList
            lockable={true}
            toBottomHeight={'100%'}
            dataSource={messageList}
            isThinking={isThinking}
          />
        </div>
        <form
          className="HD_aichatbot-float-bubble-chatbox-actions"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <textarea
            className="HD_aichatbot-float-bubble-chatbox-chat-input"
            placeholder="Type your message"
            {...register('message')}
          ></textarea>
          <button type="submit">
            <IoIosSend className="HD_aichatbot-float-bubble-chatbox-chat-send-icon" />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatBubble;
