import React from 'react';
import './App.scss';
import MainBox from './MainBox.jsx';

function App() {
  return (
    <div className='d-flex align-items-center justify-content-center vh-100 App'>
      <MainBox />
    </div>
  );
}

export default React.memo(App);
