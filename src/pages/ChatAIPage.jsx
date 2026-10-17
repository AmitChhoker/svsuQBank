import React from 'react';

const ChatAIPage = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src="https://chatting-beta-two.vercel.app/"
        title="Chat AI"
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  );
};

export default ChatAIPage;
