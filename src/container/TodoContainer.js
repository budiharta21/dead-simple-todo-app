import React, { Component } from 'react';
import TodoItem from './../component/TodoItem';

class TodoContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos: [],
      newItemValue: '',
      counter: 0,
      isShowingNotDoneOnly: true,
    };

    this.onChangeInput = (event) => {
      this.setState({ newItemValue: event.target.value });
    };

    this.onEnterKeyDown = (event) => {
      const { newItemValue, counter } = this.state;
      const value = newItemValue.trim();

      if(event.key == 'Enter' && value) {
        const newTodos = [...this.state.todos];
        const newElement = {
          id: counter,
          label: value,
          isDone: false,
        };
        newTodos.push(newElement);

        this.setState({
          todos: newTodos,
          newItemValue: '',
          counter: counter+1,
        });
      };
    };

    this.onRemove = (selectedTodo) => () => {
      const { todos } = this.state;
      const newTodos = [];

      todos.map((todo) => {
        if(selectedTodo.id != todo.id) {
          newTodos.push(todo);
        };
      });

      this.setState({ todos: newTodos });
      if(newTodos.length == 0) {
        this.setState({ isShowingNotDoneOnly: true });
      }
    };

    this.onToggleIsDone = (selectedTodo) => () => {
      const { todos } = this.state;
      const newTodos = [];

      todos.map((todo) => {
        if(selectedTodo.id == todo.id) {
          const updatedTodoItem = {
            id: todo.id,
            label: todo.label,
            isDone: !todo.isDone,
          }
          newTodos.push(updatedTodoItem);
        }else{
          newTodos.push(todo);
        };
      });

      this.setState({ todos: newTodos });
    }

    this.onToggleDoneFilter = () => {
      this.setState({
        isShowingNotDoneOnly: !this.state.isShowingNotDoneOnly,
      })
    }
  };

  render() {
    const {
      isManipulate,
      todos,
      newItemValue,
      isShowingNotDoneOnly,
    } = this.state;

    let showedTodos = [];

    if(isShowingNotDoneOnly){
      todos.map(todo => {
        if(!todo.isDone) {
          showedTodos.push(todo);
        }
      });
    }else{
      showedTodos = [...todos];
    }

    let doneTodoCount = 0;
    todos.map(todo => {
      if(todo.isDone){
        doneTodoCount++;
      }
    });

    return (
      <div style={{display: 'inline-block', verticalAlign: 'top', marginRight: 24, width: 250}}>
        <h3>{this.props.board.label}</h3>
        <p>{doneTodoCount} / {todos.length} is done.</p>
        <div>
          <input type='text' value={newItemValue} onChange={this.onChangeInput} onKeyDown={this.onEnterKeyDown} />
        </div>
        <br/>
        <div>
          <button onClick={this.onToggleDoneFilter} disabled={todos.length == 0 || doneTodoCount == 0}>
            {!isShowingNotDoneOnly ? 'Show not done yet only' : 'Show all'}
          </button>
        </div>
        <br/>
        <div>
          {showedTodos.length == 0 && isShowingNotDoneOnly && doneTodoCount > 0 && <i>Everything is done!</i>}
          {showedTodos.length == 0 && isShowingNotDoneOnly && doneTodoCount == 0 && <i>Add something!</i>}
          {showedTodos.map((item, index ) => {
            return(<TodoItem
              key={index}
              index={index}
              item={item}
              onRemove={this.onRemove}
              onToggleIsDone={this.onToggleIsDone}
            />)
          })}
        </div>
      </div>
    );
  }
}

export default TodoContainer;
