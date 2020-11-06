import React, {Component} from 'react';
import {connect} from "react-redux"
import {addTodo} from "../../redux/todos-reducer";
import {View} from "react-native"
import {TodoInput} from "./TodoInput";

class TodosInputContainer extends Component {
    render() {
        return (
            <View>
                <TodoInput {...this.props}/>
            </View>
        );
    }
}
const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {addTodo})(TodosInputContainer);

