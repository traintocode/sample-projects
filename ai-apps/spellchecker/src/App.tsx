import { useState } from 'react'
import './App.css'

type ReplacementsArgType = {
  changeFrom: string,
  changeTo: string,
  reason: "Grammar" | "Spelling"
}

function App() {
  const [ textToCheck, setTextToCheck ] = useState('');
  const [ isBusy, setIsBusy ] = useState(false);
  const [ results, setResults ] = useState<ReplacementsArgType[]>([]);

  const submit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setIsBusy(true);
    const response = await fetch('https://ibk7ftff62hk5yg4rqdmksui340vbwhp.lambda-url.eu-west-2.on.aws/', {
      method: 'POST',
      body: JSON.stringify({ textToCheck })
    });
    setResults(await response.json() as ReplacementsArgType[]);
    setIsBusy(false);
  }


  return <main>
    <h1>AI Spellchecker</h1>
    <form
      onSubmit={submit}
      className="vertical"
      >
        <textarea
          rows={10}
          className="inputbox"
          value={textToCheck}
          onChange={e => setTextToCheck(e.currentTarget.value)}
          disabled={isBusy}
        />
        { !isBusy && 
      <button type="submit">Check</button> }
    </form>
    <table className="results">
      <thead>
        <tr>
          <th>Change From</th>
          <th>Change To</th>
          <th>Change Reason</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, index) => <tr key={index}>
          <td>{result.changeFrom}</td>
          <td>{result.changeTo}</td>
          <td>{result.reason}</td>
        </tr>)}
      </tbody>
    </table>
  </main>
}

export default App
