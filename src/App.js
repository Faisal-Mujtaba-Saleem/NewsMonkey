import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

import Navbar from './components/Navbar';
import News from './components/News';

const App = () => {
  const [progress, setProgress] = useState(0);

  const updateProgress = (progress) => {
    setProgress(progress);
  }

  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const pageSize = 5;

  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route path='/' element={<News key='home' setProgress={updateProgress} apiKey={apiKey} pageSize={pageSize} country='' category='general' />} />
          <Route path='/business' element={<News key='business' setProgress={updateProgress} apiKey={apiKey} pageSize={pageSize} country='' category='business' />} />
          <Route path='/entertainment' element={<News key='entertainment' setProgress={updateProgress} apiKey={apiKey} pageSize={pageSize} country='' category='entertainment' />} />
          <Route path='/general' element={<News key='general' setProgress={updateProgress} apiKey={apiKey} pageSize={pageSize} country='' category='general' />} />
          <Route path='/health' element={<News key='health' setProgress={updateProgress} apiKey={apiKey} pageSize={pageSize} country='' category='health' />} />
          <Route path='/science' element={<News key='science' setProgress={updateProgress} apiKey={apiKey} pageSize={pageSize} country='' category='science' />} />
          <Route path='/sports' element={<News key='sports' setProgress={updateProgress} apiKey={apiKey} pageSize={pageSize} country='' category='sports' />} />
          <Route path='/technology' element={<News key='technology' setProgress={updateProgress} apiKey={apiKey} pageSize={pageSize} country='' category='technology' />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;