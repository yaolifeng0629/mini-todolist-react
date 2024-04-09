/* eslint-disable react/prop-types */
import { useState } from 'react';
import ContextMenu from './menu';

function TodoList(props) {
    const [currentId, setCurrentId] = useState(-1);
    const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
    const [showContextMenu, setShowContextMenu] = useState(false);
    const { todoList, changeStatus, deleteTodo, renameTodo, topTodo, bottomTodo, upTodo, downTodo } = props;

    const todoCounts = todoList.reduce(
        (counts, todo) => {
            todo.isDone ? counts.finishedLength++ : counts.unfinishedLength++;
            return counts;
        },
        { finishedLength: 0, unfinishedLength: 0 }
    );

    const handleContextMenu = (event, id) => {
        setCurrentId(id);

        event.preventDefault();
        setContextMenuPos({ x: event.pageX, y: event.pageY });
        setShowContextMenu(true);
    };

    const closeContextMenu = () => {
        setShowContextMenu(false);
    };

    const handleContextMenuAction = action => {
        const actions = {
            delete: deleteTodo,
            rename: renameTodo,
            top: topTodo,
            bottom: bottomTodo,
            up: upTodo,
            down: downTodo,
        };

        if (actions[action]) {
            actions[action](currentId);
            closeContextMenu();
        }
    };

    return (
        <div className="w-3/4" onClick={closeContextMenu}>
            <h2 className="text-white text-left font-bold text-2xl">
                所有待办：{todoList.length}
                <h5 className="text-xl ml-6 text-red-500">未完成：{todoCounts.unfinishedLength}</h5>
                <h5 className="text-xl ml-6 text-gray-400">已完成：{todoCounts.finishedLength}</h5>
            </h2>
            <div className="flex flex-col items-center mt-5 min-h-60">
                {todoList && todoList.length ? (
                    todoList.map((todo, index) => {
                        return (
                            <div className="todo-item w-2/3 h-12 flex items-center justify-center mb-1" key={index}>
                                <input
                                    type="checkbox"
                                    className="w-12 h-12 mr-2"
                                    checked={todo.isDone}
                                    onChange={() => changeStatus(todo.id)}
                                />
                                <div
                                    onContextMenu={event => handleContextMenu(event, todo.id)}
                                    onClick={closeContextMenu}
                                    className={`bg-cyan-50 w-full h-full flex items-center justify-center rounded-sm ${
                                        todo.isDone ? 'line-through bg-gray-400' : ''
                                    }`}
                                >
                                    {todo.content}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-gray-400 w-full min-h-60 flex justify-center items-center">暂无数据</div>
                )}
            </div>
            {showContextMenu && (
                <ContextMenu
                    todoId={currentId}
                    contextMenuPos={contextMenuPos}
                    handleContextMenuAction={handleContextMenuAction}
                />
            )}
        </div>
    );
}

export default TodoList;
