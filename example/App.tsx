import React, { useState } from 'react';
import './App.css';
import AvatarExample from './components/AvatarExample';
import ButtonExample from './components/ButtonExample';
import ChatListExample from './components/ChatListExample';
import DropdownExample from './components/DropdownExample';
import MeetingListExample from './components/MeetingListExample';
import MessageListExample from './components/MessageListExample';
import NavbarExample from './components/NavbarExample';
import PopupExample from './components/PopupExample';

const App: React.FC = () => {
  const [showComponent, setShowComponent] = useState('button');

  const btnClick = (component: String) => {
    switch (component) {
      case 'chatList':
        return <ChatListExample />;
      case 'messageList':
        return <MessageListExample />;
      case 'avatar':
        return <AvatarExample />;
      case 'button':
        return <ButtonExample />;
      case 'dropdown':
        return <DropdownExample />;
      case 'meetingList':
        return <MeetingListExample />;
      case 'navbar':
        return <NavbarExample />;
      case 'popup':
        return <PopupExample />;
      default:
        break;
    }
  };

  return (
    <div className="HD_aichatbot-example">
      <div className="HD_aichatbot-example-btn">
        <button
          style={
            showComponent === 'button'
              ? {
                  backgroundColor: '#ffffff',
                  color: '#a0c4ff',
                  border: '2px solid #a0c4ff',
                }
              : {
                  backgroundColor: '#a0c4ff',
                  color: '#ffffff',
                  border: '2px solid #a0c4ff',
                }
          }
          onClick={() => setShowComponent('button')}
        >
          AI Chatbot
        </button>
      </div>
      <div className="HD_aichatbot-example-component"> {btnClick(showComponent)}</div>
    </div>
  );
};

export default App;
