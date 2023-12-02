import { useState } from 'react'
import './App.css'

function App() {
  const [ subject, setSubject ] = useState('');
  const [ creativity, setCreativity ] = useState(80);
  const [ isBusy, setIsBusy ] = useState(false);

  const submitForm: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setIsBusy(true);
    // send to backend...
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

  </main>
}

export default App
