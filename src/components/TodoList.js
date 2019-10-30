import React, {useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { toggleCheck , changeInput, insert, remove} from '../modules/todos';

const TodoItem =  React.memo(({todo}) => {
    const {id, text, done} = todo;
    const dispath = useDispatch()
    const onToggle = useCallback(() => {
        dispath(toggleCheck(id))
     }, []);
     const onRemove = useCallback(() => {
         dispath(remove(id))
     }, [])
     const onEdit = useCallback(() => {
         dispath(edit(id))
     }, []);
    return (
        <li style={{
            textDecoration : done ? 'line-through' : 'none'
        }}>
            <span onClick ={() => onToggle(id)}>{text}</span>{' '}
            <button onClick={() => onEdit(id)}>수정</button>
            <button onClick={() => onRemove(id)}>삭제</button>
        </li>
    );

})

const TodoItems  = React.memo(({todos}) => {

    return todos.map(todo=> (
    <TodoItem 
        todo={todo}
        key={todo.id}
    />));
});

const TodoList = ({todos, onChange, onSubmit, input}) => {

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={input}/>
                <button type="submit">추가</button>
            </form>
            <ul>
                <TodoItems todos={todos} />
            </ul>
        </div>
    );

}

export default TodoList;