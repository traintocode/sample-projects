import { useState } from 'react'
import './App.css'

function App() {
  const [ foodItems, setFoodItems ] = useState<string[]>([]);
  const [ itemInputValue, setItemInputValue ] = useState('');
  const [ generatedRecipe, setGeneratedRecipe ] = useState('');
  const [ isBusy, setIsBusy ] = useState(false);

  const addFoodItem: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (itemInputValue.length === 0) return;
    setFoodItems([...foodItems, itemInputValue]);
    setItemInputValue('');
  }

  const generate = async () => {
    setIsBusy(true);
    const response = await fetch('my-url.com', {
      method: 'POST',
      body: JSON.stringify({ foodItems })
    });
    setGeneratedRecipe(await response.text());
    setIsBusy(false);
  }

  return <main>
    <h1>AI Recipe Suggester</h1>
    <p>Enter the food items you have available to generate a recipe!</p>
    <ul>
      {foodItems.map(item => <li key={item}>{item}</li>)}
    </ul>
    <form onSubmit={addFoodItem} className="vertical">
      <input type="text" 
            placeholder='New Food Item' 
            value={itemInputValue} 
            onChange={e => setItemInputValue(e.currentTarget.value)} 
            />
      <button type="submit">Add</button>
    </form>
    <div className="row">
      <button disabled={isBusy} onClick={generate}>Generate Recipe!</button>
    </div>
    <article>
      {generatedRecipe}
    </article>
  </main>
}

export default App
