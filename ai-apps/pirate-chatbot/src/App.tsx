import { useState } from 'react'
import './App.css'

type Message = {
  text: string,
  from: 'ai' | 'user'
};

function App() {
  const [ messages, setMessages ] = useState<Message[]>([]);
  const [ newInputValue, setNewInputValue ] = useState('');
  const [ isBusy, setIsBusy ] = useState(false);

  const newMessage: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setIsBusy(true);
    setNewInputValue('');
    const newMessages: Message[] = [...messages, {
      text: newInputValue,
      from: 'user'
    }];
    setMessages(newMessages);
    const response = await fetch('https://ibk7ftff62hk5yg4rqdmksui340vbwhp.lambda-url.eu-west-2.on.aws/', {
      method: 'POST',
      body: JSON.stringify({ messages: newMessages })
    });
    setMessages([...newMessages, {
      from: 'ai',
      text: await response.text()
    }]);
    setIsBusy(false);
  }

  return <main>
    <h1>Pirate Chat Bot</h1>
    <div>
      {messages.map((message, index) => <p key={index} className={"message " + message.from}>
        {message.text}
      </p>)}
    </div>
    <form
      className="vertical"
      onSubmit={newMessage}
      >
      <input type="text"
        value={newInputValue} 
        onChange={e => setNewInputValue(e.currentTarget.value)} 
        placeholder='New Message'
      />
      <button type="submit" disabled={isBusy}>Send</button>
    </form>
  </main>
}

export default App
