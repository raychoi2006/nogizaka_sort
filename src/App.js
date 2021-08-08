import React, { Component, useState } from 'react'
import './App.css';
import member from './member';
import { Helmet } from 'react-helmet';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      printresult: false,
      sortedList: [],
      leftimg: [],
      rightimg: [],
      leftname: [],
      rightname: [],
      draw: [],
      counter: 1
    };
  }

  componentDidMount() {
    this.bottomUpMergeSort(member);
  }

  async bottomUpMergeSort(items) {
    var array = [];

    if (items) {
      array = items.map(function (item) { return item; });
    }

    await this.bottomUpSort(array, array.length);
    var finalSorted = array.reverse()

    this.setState({
      sortedList: finalSorted,
      printresult: true
    })
  }

  async bottomUpSort(items, n) {
    var width, i;

    for (width = 1; width < n; width = width * 2) {
      for (i = 0; i < n; i = i + 2 * width) {
        await this.bottomUpMerge(items, i, Math.min(i + width, n), Math.min(i + 2 * width, n));
      }
    }
  }

  async bottomUpMerge(items, left, right, end) {
    var n = left,
      m = right,
      currentSort = [],
      j;

    for (j = left; j < end; j++) {
      //setstate and info, await here

      if (n < right) {
        if (items[m] !== undefined) {
          var savedChoice;
          var choicePromise = new Promise(function (resolve, reject) {
            savedChoice = resolve;
          });
          const leftimg = (<img className="photo" src={items[n].link} onClick={() => savedChoice('left')} />);
          const rightimg = (<img className="photo" src={items[m].link} onClick={() => savedChoice('right')} />);
          const leftname = (<p>{items[n].name}</p>);
          const rightname = (<p>{items[m].name}</p>);
          const draw = (<button className="draw" onClick={()=>{savedChoice('draw')}}>No Preference</button>);
          this.setState({
            leftimg: leftimg,
            rightimg: rightimg,
            leftname: leftname,
            rightname: rightname,
            draw: draw,
          })
        }
        if (m >= end || (await choicePromise == 'right' || items[m] == undefined)) {
          //push left
          currentSort.push(items[n]);
          n++;
          if (items[m] != undefined)
            this.setState({
              counter: this.state.counter + 1
            })
        } else {
          //push right
          currentSort.push(items[m]);
          m++;
        }

      }
      else {
        //push right
        currentSort.push(items[m]);
        m++;
      }
    }
    //make changes to final
    currentSort.map(function (item, i) { items[left + i] = item; });
  }

  render() {
    return (
      <div className="App">
         {this.state.printresult?
      <table className="result">
        <tbody>
          <tr>
            <td colSpan="2">
              Sorted Result
            </td>
          </tr>
          {this.state.sortedList.map((item,key)=>{
            return(
              <tr>
                <td colSpan="2">
                  Sorted Result
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    :
      <table className="centertable">
        <tbody>
          <tr>
              <td>
                {this.state.leftimg}
              </td>
              <td>
                {this.state.rightimg}
              </td>
          </tr>
          <tr>
            <td>
              {this.state.leftname}
            </td>
            <td>
              {this.state.rightname}
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              {this.state.draw}
              </td>
          </tr>
          <tr>
            <td colSpan="2">Progress: {this.state.counter}%</td>
          </tr>
          </tbody>
      </table>
    }
      </div>
    );
  }
}

class recursionMergeSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      printresult: false,
      sortedList: [],
      leftimg: [],
      rightimg: [],
      leftname: [],
      rightname: [],
      draw: [],
      questions: []
    };
  }

  componentDidMount() {
    this.mergeSort(member)
  }

  mergeSort(arr) {
    if (arr.length === 1) {
      // return once we hit an array with a single item
      return arr
    }

    let self = this;

    const middle = Math.floor(arr.length / 2) // get the middle item of the array rounded down
    const left = arr.slice(0, middle) // items on the left side
    const right = arr.slice(middle) // items on the right side

    return Promise.all([self.mergeSort(left), self.mergeSort(right)]
    ).catch(function (err) { throw err; }).then(function (values) { return self.merge(values[0], values[1]) });
  }

  async merge(left, right) {
    let result = []
    let indexLeft = 0
    let indexRight = 0
    console.log(left)
    console.log(right)

    while (indexLeft < left.length && indexRight < right.length) {
      var savedChoice;
      var choicePromise = new Promise(function (resolve, reject) {
        savedChoice = resolve;
      });
      const leftimg = (<img className="photo" src={left[indexLeft].link} onClick={() => savedChoice('left')} />);
      const rightimg = (<img className="photo" src={right[indexRight].link} onClick={() => savedChoice('right')} />);
      const leftname = (<p>{left[indexLeft].name}</p>);
      const rightname = (<p>{right[indexRight].name}</p>);
      const draw = (<button onClick={() => { savedChoice('draw') }}>No Preference</button>);
      this.setState(prevState => ({
        leftimg: leftimg,
        rightimg: rightimg,
        leftname: leftname,
        rightname: rightname,
        draw: draw,
        questions: [{ leftimg: leftimg, rightimg: rightimg, leftname: leftname, rightname: rightname, draw: draw }, ...prevState.questions]
      }))

      if (await choicePromise == 'right') {
        console.log('right')
        result.push(left[indexLeft])
        indexLeft = indexLeft + 1
      } else {
        console.log('left')
        result.push(right[indexRight])
        indexRight = indexRight + 1
      }
      if (this.state.questions.length > 0) {
        var questionsList = this.state.questions
        var nextq = questionsList.pop()
        this.setState({
          leftimg: nextq.leftimg,
          rightimg: nextq.rightimg,
          leftname: nextq.leftname,
          rightname: nextq.rightname,
          draw: nextq.draw,
          questions: questionsList
        })
      }
    }

    return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
  }


  render() {


    return (
      <div className="App">
        {this.state.printresult ?
          <table className="centertable">
            <tbody>
              <tr>
                <td colSpan="2">
                  Sorted Result
                </td>
              </tr>
              {this.state.sortedList.map((item, key) => {
                return (
                  <tr>
                    <td>{key + 1}.</td>
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
                <td>
                  {this.state.leftimg}
                </td>
                <td>
                  {this.state.rightimg}
                </td>
              </tr>
              <tr>
                <td>
                  {this.state.leftname}
                </td>
                <td>
                  {this.state.rightname}
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  {this.state.draw}
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