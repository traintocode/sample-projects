import { useState } from 'react'
import './App.css'

type RequestBody = {
  subject: string,
  temperature?: number,
  model?: "gpt-3.5-turbo" | "gpt-4"
};

function App() {
  const [ subject, setSubject ] = useState('');
  const [ creativity, setCreativity ] = useState(80);
  const [ isBusy, setIsBusy ] = useState(false);
  const [ poem, setPoem ] = useState('');

  const submitForm: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setIsBusy(true);
    const body: RequestBody = {
      subject,
      temperature: creativity / 100,
      model: creativity > 0.8 ? 'gpt-4' : 'gpt-3.5-turbo'
    };
    const response = await fetch('https://ibk7ftff62hk5yg4rqdmksui340vbwhp.lambda-url.eu-west-2.on.aws/', {
      method: 'POST',
      body: JSON.stringify(body)
    });
    setPoem(await response.text());
    setIsBusy(false);
  }

  return <main>
    <h1>AI Poetry Writer</h1>
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
      <label htmlFor="creativity">Creativity</label>      
      <input type="range"
        id="creativity"
        value={creativity}
        onChange={e => setCreativity(e.currentTarget.valueAsNumber)}
        min={10}
        max={100}
        disabled={isBusy}
        />
      <button type="submit" disabled={isBusy}>Create</button>
    </form>
    <pre className="poem">
      {poem}
    </pre>
  </main>
}

export default App
