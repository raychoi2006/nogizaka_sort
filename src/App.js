import React, { Component, useState } from 'react'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  PrefList(n) {
    this.size = n;
    this.items = [{item: 0, equals: []}];
    this.current = {item: 1, try: 0, min: 0, max: 1};
  }

  addAnswer(x, y, pref) {
  if (pref == 0) {
      this.items[this.current.try].equals.push(this.current.item);
      this.current = {item: ++this.current.item, try: 0, min: 0, max: this.items.length};
  } else {
      if (pref == -1) this.current.max = this.current.try
      else this.current.min = this.current.try + 1;
      if (this.current.min == this.current.max) {
          this.items.splice(this.current.min, 0, {item: this.current.item, equals: []});
          this.current = {item: ++this.current.item, try: 0, min: 0, max: this.items.length};
        }
    }
  }

  getQuestion() {
    if (this.current.item >= this.size) return null;
    this.current.try = Math.floor((this.current.min + this.current.max) / 2);
    return({a: this.current.item, b: this.items[this.current.try].item});
  }

  getOrder() {
    var index = [];
    for (var i in this.items) {
        var equal = [this.items[i].item];
        for (var j in this.items[i].equals) {
            equal.push(this.items[i].equals[j]);
        }
        index.push(equal);
    }
    return(index);
  }

// // THIS FUNCTION ACTS AS THE PERSON ANSWERING THE QUESTIONS
//  preference(a, b) {
//     if (Math.random() > 0.6) return -1; else if (Math.random() > 0.333) return  1; else return 0;
// }

// // CREATE TABLE AND ASK QUESTIONS UNTIL TABLE IS COMPLETE
// var fruit = ["orange", "apple", "pear", "banana", "kiwifruit", "grapefruit", "peach", "cherry", "starfruit", "strawberry"];
// var t = new PrefList(10), c = 0, q;
// while (q = t.getQuestion()) {
//     document.write(++c + ". " + fruit[q.a] + " or " + fruit[q.b] + "?<BR>");
//     var answer = preference(fruit[q.a], fruit[q.b]);
//     document.write("&nbsp;&rarr; " + [fruit[q.a], "no preference", fruit[q.b]][answer + 1] + "<BR>");
//     t.addAnswer(q.a, q.b, answer);
// }

// // PERFORM SORT BASED ON TABLE AND DISPLAY RESULT
// var index = t.getOrder();
// document.write("LIST IN ORDER:<BR>");
// for (var i = 0, pos = 1; i < index.length; i++) {
//     var pre = pos + ". ";
//     for (var j = 0; j < index[i].length; j++) {
//         document.write(pre + fruit[index[i][j]] + "<BR>");
//         pre = "&nbsp;&nbsp;&nbsp;&nbsp;";
//     }
//     pos += index[i].length;
// }
  render() {

  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit fk<code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
}


export default App;
