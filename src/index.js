// import 'spectre.css/dist/spectre.css'; import
// 'spectre.css/dist/spectre-exp.css'; import
// 'spectre.css/dist/spectre-icons.css';

import './spectre.css/spectre.css';
import './spectre.css/spectre-exp.css';
import './spectre.css/spectre-icons.css';

import 'font-awesome/css/font-awesome.css'

import 'chartist/dist/chartist.css';

import './index.css';

import React from 'react';
// import ReactDOM from 'react-dom';
import {render} from 'react-snapshot';
import App from './App';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-41172423-4');

/*
window.onerror = function (msg, url, lineNo, columnNo, error) {
  console.error([msg, url, lineNo, columnNo, error]);
  return false;
}
*/

// Polyfills here

if (!Number.isInteger) {
  Number.isInteger = function isInteger(nVal) {
    return typeof nVal === "number" && isFinite(nVal) && nVal > -9007199254740992 && nVal < 9007199254740992 && Math.floor(nVal) === nVal;
  };
}

// ReactDOM.render(
render(
  <App/>, document.getElementById('root'));
