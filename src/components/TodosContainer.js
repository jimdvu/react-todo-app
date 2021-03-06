import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'

class TodosContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      todos: [],
      inputValue: ''
    }
  }

  getTodos(){
    axios.get('/api/v1/todos')
    .then(response => {
      this.setState({todos: response.data})
    })
    .catch(error => console.log(error))
  }

  createTodo(){
    if(e.key === 'Enter'){
      axios.post('/api/v1/todos', {todo: {title: e.target.value}})
      .then(response => {
        const todos = update(this.state.todos, {
          $splice: [[0, 0, response.data]]
        })
        this.setState({
          todos: todos,
          inputValue: ''
        })
      })
      .catch(error => console.log(error))
    }
  }

  handleChange = (e) => {
    this.setState({inputValue: e.target.value});
  }

  componentDidMount(){
    this.getTodos()
  }
  render() {
    return(
      <div>
        <div className="inputContainer">
          <input className="taskInput" type="text" placeholder="Add a task" onKeyPress={this.createTodo} value={this.state.inputValue} onChange={this.handleChange}/>
        </div>
        <div className="listWrapper">
          <ul className="taskList">
            {this.state.todos.map((todo) => {
              return(
                <li className="task" todo={todo} key={todo.id}>
                  <input className="taskCheckbox" type="checkbox" />
                  <label className="taskLabel">{todo.title}</label>
                  <span className="deleteTaskBtn">x</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default TodosContainer
