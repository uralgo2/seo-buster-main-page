import React from 'react';
import {Route, Routes} from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom'
import MainPage from './components/MainPage';
import './styles/app.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path='/' element={<MainPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
