import React, { Component, useState } from 'react'
import logo from './logo.svg';
import './App.css';
import member from './member';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
       memberList:[],
       x:0,
       y:1,
       leftmember:{},
       rightmember:{},
       loading:true,
       printresult:false,
       sortedList:[],
       totals: 0,
       count:0
    };
  }

  componentDidMount() {
    this.initialize()
  }

  initialize() {
    var x = member.map((item,key)=>{
      return {name:item.name,link:item.link,score:0}
    })
    var totalQ = this.findNumOfQuestion(x.length)
    console.log(totalQ)
    this.setState({
      memberList: x,
      leftmember: x[this.state.x],
      rightmember: x[this.state.y],
      totals: totalQ,
      loading:false
    })
  }

  findNumOfQuestion(z) {
    const newz = z-1
    if(newz > 0)
      return newz + this.findNumOfQuestion(newz)
    else
      return 0
  }

  getNextQuestion(choice) {
    if(choice == 'one') {
     // $scope.foodArray[x].score++;
      var updatemList = [...this.state.memberList];
      updatemList[this.state.x].score = updatemList[this.state.x].score+1;
      this.setState({
        memberList: updatemList
      })
    } else if(choice == 'two') {
       // $scope.foodArray[y].score++; 
       var updatemList = [...this.state.memberList];
      updatemList[this.state.y].score = updatemList[this.state.y].score+1;
      this.setState({
        memberList: updatemList
      })               
    }
    if(this.state.y < this.state.memberList.length -1) {
        //y++;
        //$scope.foodTwo = $scope.foodArray[y];
        var nexty = this.state.y +1;
        var nextcount = this.state.count +1;
        this.setState({
          count: nextcount,
          y: nexty,
          rightmember: this.state.memberList[nexty]
        })
    } else if(this.state.x < this.state.memberList.length -2) {
        //x++;
        //y = 1 + x;
        //$scope.foodOne = $scope.foodArray[x];
        //$scope.foodTwo = $scope.foodArray[y];
        var nextx = this.state.x +1;
        var nexty = nextx +1;
        var nextcount = this.state.count +1;
        this.setState({
          count: nextcount,
          x: nextx,
          y: nexty,
          leftmember: this.state.memberList[nextx],
          rightmember: this.state.memberList[nexty]
        })
    } else {
        this.sortResult();   
    }
  }

  sortResult() {
    //$scope.foodArray.sort(function(a,b) {
      //return b.score - a.score;  
    //});
    //$scope.finished = true;
    var sortedList = this.state.memberList.sort(function(a,b) {
      return b.score - a.score;  
    })
    console.log(sortedList)
    this.setState({
      sortedList: sortedList,
      printresult:true
    })
  }  
 
  render() {

  
  return (
    <div className="App">
    {this.state.loading?(false):this.state.printresult?
      <table className="centertable">
        <tbody>
          <tr>
            <td colSpan="2">
              Sorted Result
            </td>
          </tr>
          {this.state.sortedList.map((item,key)=>{
            return(
              <tr>
                <td>{key+1}.</td>
                <td>{item.name}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    :
      <table className="centertable">
        <tbody>
          <tr>
            <td>Progress:</td>
            <td>{Math.floor((this.state.counts/this.state.totals))}%</td>
          </tr>
          <tr>
              <td>
                <img src={this.state.leftmember.link} onClick={()=>this.getNextQuestion('one')}/>
              </td>
              <td>
                <img src={this.state.rightmember.link} onClick={()=>this.getNextQuestion('two')}/>
              </td>
          </tr>
          <tr>
            <td>
              <p>{this.state.leftmember.name}</p>
            </td>
            <td>
              <p>{this.state.rightmember.name}</p>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button onClick={()=>this.getNextQuestion('nopref')}>No preference</button>
              </td>
          </tr>
          </tbody>
      </table>
    }
    </div>
  );
}
}


export default App;