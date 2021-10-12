import React, { Component } from 'react'
import { addTodo, getTodos } from '../todos-api.js';

export default class TodosPage extends Component {

    state = {
        todos: [],
        todo: ''
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
        console.log('asdf');
        const { todo } = this.state;
        const { token } = this.props;
        await addTodo(todo, token);
        await this.storeTodos();
        this.setState({ todo: '' });
    }

    render() {
        const { todos, todo } = this.state;
        return (
            <div>
                <label>
                    Todo:
                    <input value={todo} onChange={this.handleNewTodoChange} />
                </label>
                <button onClick={this.handleAddTodo} >Add</button>
                <ul>
                    {//I hate this syntax
                    todos.map(({id, completed, todo}) => {
                        return <li key={id} className={completed ? "completed" : "not-completed"}>{todo}</li>
                    })}
                </ul>
            </div>
        )
    }
}
