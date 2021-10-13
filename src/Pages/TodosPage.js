import React, { Component } from 'react'
import { addTodo, deleteTodo, getTodos, updateTodo } from '../todos-api.js';
import { TextField, Button, IconButton } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';

export default class TodosPage extends Component {

  state = {
    todos: [],
    todo: ''
  }

  strickenSx = {
    textDecoration: 'line-through'
  }

  listItemSx = {
    overflow: 'hidden',
    '& button': {
      transition: '0.2s',
      transform: 'translateX(50px)'
    },
    '&:hover, &:focus': {
      '& button': {
        transform: 'translateX(15px)'
      }
    }
  }

  storeTodos = async () => {
    const { token } = this.props;
    const response = await getTodos(token);
    console.log(response);
    this.setState({ todos: response });
  }

  componentDidMount = () => {
    this.storeTodos();
  }

  handleNewTodoChange = (e) => {
    this.setState({ todo: e.target.value });
  }

  handleAddTodo = async () => {
    const { todo } = this.state;
    const { token } = this.props;
    await addTodo(todo, token);
    await this.storeTodos();
    this.setState({ todo: '' });
  }

  handleTodoClick = async (todoId) => {
    const { todos } = this.state;
    const { token } = this.props;
    const todo = todos.filter(item => item.id === todoId)[0];
    todo.completed = !todo.completed;
    todo.todo_id = todo.id;
    await updateTodo(todo, token);
    await this.storeTodos();
  }

  handleDeleteClick = async (todoId) => {
    const { token } = this.props;
    await deleteTodo(todoId, token);
    await this.storeTodos();
  }

  handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      this.handleAddTodo();
    }
  }

  render() {
    const { todos, todo } = this.state;
    return (
      <div className="todos-div">
        <div className="input-div">
          <TextField
            value={ todo }
            onChange={ this.handleNewTodoChange }
            label="New Todo"
            variant="outlined"
            onKeyUp={ this.handleKeyUp }
            size="small"
          />
          <Button
            onClick={ this.handleAddTodo }
            variant="contained" 
            size="small"
            sx={{
              backgroundColor: '#3483a2',
              ":hover": {
                backgroundColor: '#44aad2'
              }
            }}
          >
            Add
          </Button>
        </div>
        <List>
            { todos.map(({ id, completed, todo }) => {
              return (
                <ListItem disablePadding key={id} sx={this.listItemSx} >
                  <ListItemButton onClick={ () => this.handleTodoClick(id) }>
                    <ListItemText sx={completed ? this.strickenSx : {}} >
                      {todo}
                    </ListItemText>
                    <IconButton onClick={ () => this.handleDeleteClick(id) } >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemButton>
                </ListItem>
              )
            })}
        </List>
      </div>
    )
  }
}
