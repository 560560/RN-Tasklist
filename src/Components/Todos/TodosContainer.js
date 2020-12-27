import React, {Component} from 'react';
import {checkTodo, editTodo, getTodos, removeTodo, setEditMode, setRefreshing} from "../../redux/todos-reducer";
import {connect} from "react-redux"
import Todos from "./Todos";
import {getSelectedTodos} from "../../redux/todosSelectors";
import {getDoneTodos} from "../../redux/todosSelectors";



class TodosContainer extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.getTodos()
    }

    onRefresh = () => {
        this.props.setRefreshing(true)
        this.props.getTodos()
        setTimeout(() => {
            this.props.setRefreshing(false)
        }, 2000)
    }

    render() {
        return (
            <Todos {...this.props}  onRefresh={this.onRefresh}/>
        );
    }
}

const mapStateToProps = (state) => ({
    todos: getSelectedTodos(state),
    doneTodos: getDoneTodos(state),
    isRefreshing: state.todos.isRefreshing,
    todoUnderEdit: state.todos.todoUnderEdit,
    isLoading: state.todos.isLoading
})

export default connect(mapStateToProps, {getTodos, removeTodo, checkTodo, setRefreshing, setEditMode, editTodo})(TodosContainer);