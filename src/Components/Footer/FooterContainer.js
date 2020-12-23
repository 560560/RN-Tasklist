import React, {Component} from 'react';
import {connect} from "react-redux";
import {getTodos, setShowDoneTasks} from "../../redux/todos-reducer";
import {Footer} from "./Footer";
import {setScreenToShow} from "../../redux/screens-reducer";

class FooterContainer extends Component {
    render() {
        return (
            <Footer {...this.props}/>
        );
    }
}

const mapStateToProps = (state) => ({
    showDoneTasks: state.todos.showDoneTasks,
    screenToShow: state.screens.screenToShow
})

export default connect(mapStateToProps, {setShowDoneTasks, getTodos, setScreenToShow})(FooterContainer);