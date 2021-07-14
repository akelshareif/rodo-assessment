import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './App.css';

// Custom CSS was grabbed from given HTML file and separeted into CSS File
// CSS file was imported into topmost level to ensure global usage for all components

ReactDOM.render(<App />, document.getElementById('root'));
