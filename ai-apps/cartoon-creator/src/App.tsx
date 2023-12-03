import { useState } from 'react'
import './App.css'

type RequestBody = {
  subject: string,
  temperature?: number,
  model?: "gpt-3.5-turbo" | "gpt-4"
};

function App() {
  const [ subject, setSubject ] = useState('');
  const [ isBusy, setIsBusy ] = useState(false);
  const [ imageUrl, setImageUrl ] = useState('');

  const submitForm: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setIsBusy(true);
    const response = await fetch('https://ibk7ftff62hk5yg4rqdmksui340vbwhp.lambda-url.eu-west-2.on.aws/', {
      method: 'POST',
      body: JSON.stringify({ subject })
    });
    setImageUrl(await response.text());
    setIsBusy(false);
  }

  return <main>
    <h1>Cartoon Image Generator</h1>
    <form
      className="inputform"
      onSubmit={submitForm}
      >
      <label htmlFor="subject">Subject</label>
      <input type="text"
        id="subject"
        value={subject} 
        onChange={e => setSubject(e.currentTarget.value)} 
        disabled={isBusy}
      />
      <button type="submit" disabled={isBusy}>Create</button>
    </form>
    <img src={imageUrl} />
  </main>
}

export default App
