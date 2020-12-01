import React, {Component} from 'react';

import {checkTodo, getTodos, removeTodo, setRefreshing} from "../../redux/todos-reducer";
import {connect} from "react-redux"
import Todos from "./Todos";


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
    todos: state.todos.todos,
    isRefreshing: state.todos.isRefreshing
})

export default connect(mapStateToProps, {getTodos, removeTodo, checkTodo, setRefreshing})(TodosContainer);