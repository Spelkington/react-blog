import React from 'react';
import Post from './components/Post'
import './styles/App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Post postName="testpost"></Post>
    </div>
  );
}

export default App;
