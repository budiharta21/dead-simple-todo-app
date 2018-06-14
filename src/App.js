import React, { Component } from 'react';
import TodoContainer from './container/TodoContainer';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      boards: [],
      newBoardName: '',
      boardCounter: 0
    };

    this.onChangeInput = (e) => {
      this.setState({ newBoardName: e.target.value });
    }

    this.onKeyEnterPress = (e) => {
      const { boards, boardCounter, newBoardName } = this.state;
      const value = newBoardName.trim();

      if(value) {
        const newBoards = [...boards]
        if(e.key == 'Enter') {
          newBoards.push({
            id: boardCounter,
            label: newBoardName,
          });

          this.setState({
            boards: newBoards,
            boardCounter: boardCounter+1,
            newBoardName: '',
          });
        };
      }
    }
  };

  render() {
    const { boards, newBoardName } = this.state;

    return (
      <div style={{overflowX: 'auto'}}>
        <h1>Dead Simple ToDo Board</h1>
        <div style={{whiteSpace: 'nowrap'}}>
          {boards.map(board => {
            return(
              <TodoContainer board={board} />
            );
          })}
          <div style={{display: 'inline-block', width: 200}}>
            <input type='text'
              value={newBoardName}
              placeholder='Create new board'
              onChange={this.onChangeInput}
              onKeyDown={this.onKeyEnterPress}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
