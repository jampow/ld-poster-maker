import { useState } from 'react'
import './App.css'
import Canvas from './Canvas'

function App() {
  const [text, setText] = useState('Nome do encontro escrever aqui');
  const [datetime, setDatetime] = useState('');

  return (
    <>
      <Canvas title={text} datetime={datetime} />
      <input
        type="text"
        placeholder="Nome da apresentação"
        onChange={(e) => {
          setText(e.target.value)
        }}
      />
      <input
        type="datetime-local"
        placeholder="Dia da apresentação"
        onChange={(e) => {
          setDatetime(e.target.value)
        }}
      />
    </>
  )
}

export default App
