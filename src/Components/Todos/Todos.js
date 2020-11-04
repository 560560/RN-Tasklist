import React from 'react';
import {FlatList, View} from "react-native";
import {TodoItem} from "./TodoItem/TodoItem";

const Todos = ({todos}) => {
    return (
        <View>
            <FlatList
                data={todos}
                renderItem={({item}) => (
                    <TodoItem todo={item.title}/>
                )}
                keyExtractor={item => item.id}/>
        </View>
    );
}

export default Todos;