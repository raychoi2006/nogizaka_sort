import React, { Component, useState } from 'react'
import logo from './logo.svg';
import './App.css';
import member from './member';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        size:0,
        items:[],
        current:{},
        c:0,
        q:{},
        printresult:false
    };
    this.getNextQuestion = this.getNextQuestion.bind(this);
  }

  componentDidMount() {
      this.initialize()
      console.log(member)
  }

  initialize() {
      //get member array
       // var fruit = ["orange", "apple", "pear", "banana", "kiwifruit", "grapefruit", "peach", "cherry", "starfruit", "strawberry"];
// var t = new PrefList(10), c = 0, q;
// while (q = t.getQuestion()) {
  console.log(member)
  console.log(member.length)
    this.PrefList(member.length)
    this.setState({
        member: member,
        q: this.getQuestion()
    })
  }

  getNextQuestion(answer) {
    //var answer = preference(fruit[q.a], fruit[q.b]);
    //     document.write("&nbsp;&rarr; " + [fruit[q.a], "no preference", fruit[q.b]][answer + 1] + "<BR>");
    //     t.addAnswer(q.a, q.b, answer);
    //     document.write(++c + ". " + fruit[q.a] + " or " + fruit[q.b] + "?<BR>");
    if (this.state.q!=null) {
        this.addAnswer(this.state.q.a,this.state.q.b,answer)
        this.setState({
            q: this.getQuestion()
        })
    } else {
        this.sortPrint()
    }
  }

  sortPrint() {
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
    var index = this.getOrder()
    console.log(index)
  }

  PrefList(n) {
    this.setState({
        size: n,
        items: [{item:0,equals:[]}],
        current: {item:1,try:0,min:0,max:1}
    })
    //this.size = n;
    //this.items = [{item: 0, equals: []}];
    //this.current = {item: 1, try: 0, min: 0, max: 1};
  }

  addAnswer(x, y, pref) {
  if (pref == 0) {
      //this.items[this.current.try].equals.push(this.current.item);
      //this.current = {item: ++this.current.item, try: 0, min: 0, max: this.items.length};
      var joined = this.state.items[this.state.current.try].equals.concat(this.state.current.item)
      this.setState({
          items: joined,
          current: {item: this.state.current.item+1, try: 0, min: 0, max: this.state.items.length}
      })
  } else {
      if (pref == -1) 
        //this.current.max = this.current.try
        this.setState(prevState=>({
           current:{
               ...prevState.current,
               max: this.state.current.try
           } 
        }))
      else 
        //this.current.min = this.current.try + 1;
        this.setState(prevState=>({
            current:{
                ...prevState.current,
                min: this.state.current.try+1
            } 
         }))
      if (this.state.current.min == this.state.current.max) {
         // this.items.splice(this.current.min, 0, {item: this.current.item, equals: []});
          //this.current = {item: ++this.current.item, try: 0, min: 0, max: this.items.length};
        var spliced = this.state.items.splice(this.state.current.min, 0, {item: this.state.item, equals: []})
        this.setState({
            items: spliced,
            current: {item: this.state.current.item+1, try: 0, min: 0, max: this.state.items.length}
        })
        }
    }
  }

  getQuestion() {
    if (this.state.current.item >= this.state.size) return null;
    //this.current.try = Math.floor((this.current.min + this.current.max) / 2);
    this.setState(prevState=>({
        current:{
            ...prevState.current,
            try: Math.floor((this.state.current.min + this.state.current.max) / 2)
        } 
     }))
    console.log(this.state.items)
    console.log(this.state.current)
    return({a: this.state.current.item, b: this.state.items[this.state.current.try].item});
  }

  getOrder() {
    var index = [];
    for (var i in this.state.items) {
        var equal = [this.state.items[i].item];
        for (var j in this.state.items[i].equals) {
            equal.push(this.state.items[i].equals[j]);
        }
        index.push(equal);
    }
    return(index);
  }

  render() {

  
  return (
    <div className="App">
    {/* {this.state.printresult?(false):
      <table>
          <tr>
              <td>
                <img src={this.state.member[this.state.q.a].link} onClick={()=>this.getNextQuestion(-1)}/>
              </td>
              <td>
                <img src={this.state.member[this.state.q.b].link} onClick={()=>this.getNextQuestion(1)}/>
              </td>
          </tr>
          <tr>
            <td>
              <p>{this.state.member[this.state.q.a].name}</p>
            </td>
            <td>
              <p>{this.state.member[this.state.q.b].name}</p>
            </td>
          </tr>
          <tr>
              <button onclick={this.getNextQuestion(0)}>No preference</button>
          </tr>
      </table>
    } */}
    </div>
  );
}
}


export default App;