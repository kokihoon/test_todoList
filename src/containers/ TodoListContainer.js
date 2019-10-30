import React, {useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { toggleCheck , changeInput, insert, remove} from '../modules/todos';
import TodoList from '../components/TodoList';

const TodoListContainer = () => {
     const {input, todos} = useSelector(state => state.todos);
     const dispath = useDispatch()



     const onChange = useCallback(e => dispath(changeInput(e.target.value)), [changeInput]);

     const onSubmit = useCallback(
         e => {
             e.preventDefault();
             dispath(insert(input));
             dispath(changeInput(''));
         }, [input, changeInput, insert]
     );

     return (
         <TodoList
            input ={input}
            todos={todos}
            onChange={onChange}
            onSubmit={onSubmit}
        />
     )
}
export default TodoListContainer;
