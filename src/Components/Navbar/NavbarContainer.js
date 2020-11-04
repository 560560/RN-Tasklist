import React, {Component} from 'react';
import {Navbar} from "./Navbar";
import {connect} from "react-redux";
import {View} from "react-native";
import {getAppName} from "../../redux/navbar-reducer";

class NavbarContainer extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.getAppName()
    }

    render() {
        return (
            <View>
                <Navbar {...this.props}/>
            </View>
        );
    }
}


const mapStateToProps = (state) => ({
    appName: state.navbarPanel.appName,
})

export default connect(mapStateToProps, {getAppName}) (NavbarContainer);