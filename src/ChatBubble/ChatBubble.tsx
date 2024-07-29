import './ChatBubble.css';

import { useCallback, useEffect, useRef, useState } from 'react';
import { IoMdChatboxes, IoIosClose, IoIosSend } from 'react-icons/io';
import { IChatBubbleProps } from '../type';
import classNames from 'classnames';
import MessageList from '../MessageList/MessageList';
import { useForm } from 'react-hook-form';
// import ChatServices from '../ChatServices';

const ChatBubble: React.FC<IChatBubbleProps> = () => {
  const messageListRef = useRef();
  const [open, setOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [messageList, setMessageList] = useState([] as any[]);

  const { register, handleSubmit, reset } = useForm({
    disabled: isThinking,
  });

  const handleVisualThinking = useCallback(
    async (message: string) => {
      if (!message || isThinking) {
        setIsThinking((prev) => !prev);

        return new Promise((resolve) => {
          setTimeout(() => {
            setIsThinking((prev) => !prev);
            resolve(true);
          }, 2000);
        });
      }

      setIsThinking((prev) => !prev);

      // const result = await ChatServices.sendMessage({ query: message });

      const result = await fetch('https://hm-agent-model.onrender.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: message,
        }),
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });

      setMessageList((prev) => {
        const newList = [...prev];
        newList.push({
          position: 'left',
          type: 'text',
          text: result.response,
        });
        return newList;
      });
      setIsThinking((prev) => !prev);
    },
    [setIsThinking]
  );

  const handleClick = useCallback(() => {
    setOpen((prev) => !prev);
  }, [setOpen]);

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent the new line
      handleSubmit(handleFormSubmit)(); // Trigger submit
    }
  };

  const handleFormSubmit = useCallback(
    (data: any) => {
      if (!data.message) return;
      setMessageList((prev) => {
        const newList = [...prev];
        newList.push({
          position: 'right',
          type: 'text',
          text: data.message,
        });
        return newList;
      });
      reset();
      handleVisualThinking(data.message);
    },
    [setMessageList]
  );

  const suggestAnConversation = async () => {
    await handleVisualThinking('');
    const message = {
      position: 'left',
      type: 'text',
      text: 'Hello guy, I am Thanh Jayson. Can I help you?',
    };
    setMessageList([message]);
  };

  const initializeConversation = () => {
    if (!messageList.length) suggestAnConversation();
  };

  useEffect(() => {
    if (!open) return;
    initializeConversation();
  }, [open]);

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
            <h1 className="HD_aichatbot-float-bubble-chatbox-title">Thanh Jayson</h1>
          </div>
        </div>
        <div className="HD_aichatbot-float-bubble-chatbox-body">
          <MessageList
            referance={messageListRef}
            lockable={false}
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
            onKeyDown={handleKeyDown}
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
