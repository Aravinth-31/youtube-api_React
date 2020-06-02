import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
/*
  window.addEventListener('scroll', this.handleOnScroll);

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleOnScroll);
  }
  handleOnScroll =  () => {
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    var clientHeight = document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      let max1=this.state.max+this.state.videosCount;
      this.setState({max:max1});
      console.log("Loaded");
      this.state.fun(this.state.key,this.state.search,this.state.max,this.state.order,this.state.videosCount);
    }
  }

*/ 
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
