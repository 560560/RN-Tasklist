import React, {Component} from 'react';
import {View} from "react-native";
import {getTodos} from "../../redux/todos-reducer";
import {connect} from "react-redux"
import Todos from "./Todos";


class TodosContainer extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
       this.props.getTodos()
    }

    render() {
        return (
            <View>
                <Todos {...this.props}/>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    todos: state.todos.todos
})

export default connect(mapStateToProps, {getTodos})(TodosContainer);