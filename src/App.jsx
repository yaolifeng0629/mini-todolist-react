import { useState, useEffect } from 'react';
import TodoList from './components/list';

function App() {
    const [todos, setTodos] = useState('');
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        getLocalStorage();
    }, []);

    useEffect(() => {
        setLocalStorage();
    }, [todoList]);

    const addTodoFn = evt => {
        if (evt.type !== 'click' && evt.keyCode !== 13) return;
        if (!todos) return;

        let todoItem = {
            id: todoList.length + 1,
            content: todos,
            isDone: false,
        };

        setTodoList(todoList => todoList.concat(todoItem));
        setTodos('');
    };

    const setLocalStorage = () => {
        localStorage.setItem('todoList', JSON.stringify(todoList));
    };

    const getLocalStorage = () => {
        let todoList = localStorage.getItem('todoList');
        if (todoList) {
            setTodoList(JSON.parse(todoList));
        }
    };

    const changeStatus = id => {
        setTodoList(todoList => {
            const updatedTodoList = todoList.map(todo => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo));
            return updatedTodoList.sort((a, b) => a.isDone - b.isDone);
        });
    };

    const deleteTodo = id => {
        setTodoList(prev => prev.filter(todo => todo.id !== id));
    };

    const renameTodo = id => {
        let todoItem = todoList.find(todo => todo.id === id);
        let newName = prompt('请输入新的名称', todoItem.content);
        if (newName) {
            setTodoList(prev =>
                prev.map(todo => {
                    if (todo.id === id) {
                        return { ...todo, content: newName };
                    } else {
                        return todo;
                    }
                })
            );
        }
    };

    const topTodo = id => {
        setTodoList(prev => {
            let index = prev.findIndex(todo => todo.id === id);
            let todo = prev.splice(index, 1);
            return todo.concat(prev);
        });
    };

    const bottomTodo = id => {
        setTodoList(prev => {
            let index = prev.findIndex(todo => todo.id === id);
            let todo = prev.splice(index, 1);
            return prev.concat(todo);
        });
    };

    const upTodo = id => {
        setTodoList(prev => {
            let index = prev.findIndex(todo => todo.id === id);
            if (index === 0) return prev;
            let newTodoList = prev.slice();
            [newTodoList[index], newTodoList[index - 1]] = [newTodoList[index - 1], newTodoList[index]];
            return newTodoList;

            // 1. 这样修改，useEffect 可以捕获到，但是页面没有更新？
            // 因为这样修改，返回的数组实际上还是原来的数组，尽管内容时改变了。
            // 注意，react 使用的浅比较，只有引用变化才会触发更新。
            // [prev[index], prev[index - 1]] = [prev[index - 1], prev[index]];
            // return prev;
        });
    };

    const downTodo = id => {
        setTodoList(prev => {
            let index = prev.findIndex(todo => todo.id === id);
            if (index === prev.length - 1) return prev;
            let newTodoList = prev.slice();
            [newTodoList[index], newTodoList[index + 1]] = [newTodoList[index + 1], newTodoList[index]];
            return newTodoList;
            // [prev[index], prev[index + 1]] = [prev[index + 1], prev[index]];
            // return prev;
        });
    };
    return (
        <>
            <h1 className="text-white text-center font-bold text-4xl">Todo List</h1>

            <div className="flex flex-rows items-center mt-5 mb-8 justify-center">
                <input
                    value={todos}
                    placeholder="please input your todo"
                    className="bg-cyan-50 rounded-sm w-3/4 h-12 outline-none"
                    onInput={e => setTodos(e.target.value)}
                    onKeyDown={addTodoFn}
                />
                <button onClick={addTodoFn} className="border w-36 h-12 text-white">
                    Add Todo
                </button>
            </div>

            <div className="flex flex-col justify-center w-full items-center h-fit">
                <TodoList
                    todoList={todoList}
                    changeStatus={changeStatus}
                    deleteTodo={deleteTodo}
                    renameTodo={renameTodo}
                    topTodo={topTodo}
                    bottomTodo={bottomTodo}
                    upTodo={upTodo}
                    downTodo={downTodo}
                />
            </div>
        </>
    );
}

export default App;
