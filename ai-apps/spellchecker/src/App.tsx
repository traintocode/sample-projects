import { useState } from 'react'
import './App.css'

function App() {
  return <main>
    <h1>AI Spellchecker</h1>
    <div>
      <p className="message ai">Hello there how arrrrr you?</p>
      <p className="message user">I'm great</p>
    </div>
    <form
      className="vertical"
      >
      <input type="text"
        placeholder='New Message'
      />
      <button type="submit">Send</button>
    </form>

  </main>
}

export default App

