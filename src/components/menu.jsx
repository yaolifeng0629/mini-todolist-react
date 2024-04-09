/* eslint-disable react/prop-types */

function ContextMenu(props) {
    const contextMenus = [
        {
            name: '删除',
            action: 'delete',
            className: 'w-full text-left border bottom-2 mb-1',
        },
        {
            name: '重命名',
            action: 'rename',
            className: 'w-full text-left border bottom-2 mb-1',
        },
        {
            name: '置顶',
            action: 'top',
            className: 'w-full text-left border bottom-2 mb-1',
        },
        {
            name: '置底',
            action: 'bottom',
            className: 'w-full text-left border bottom-2 mb-1',
        },
        {
            name: '上移',
            action: 'up',
            className: 'w-full text-left border bottom-2 mb-1',
        },
        {
            name: '下移',
            action: 'down',
            className: 'w-full text-left border bottom-2 mb-1',
        },
    ];
    let { contextMenuPos, handleContextMenuAction, todoId } = props;

    return (
        <div
            style={{
                position: 'fixed',
                top: contextMenuPos.y,
                left: contextMenuPos.x,
                zIndex: 10,
            }}
        >
            <ul className="border-gray-400 rounded-sm w-32 h-fit bg-white shadow-sm p-2">
                {contextMenus.map((item, index) => {
                    return (
                        <li
                            key={index}
                            className="w-full text-left border-b border-orange-300 mb-1 text-base active:opacity-80"
                            onClick={event => {
                                event.stopPropagation();
                                // eslint-disable-next-line no-undef
                                handleContextMenuAction(item.action, todoId);
                            }}
                        >
                            {item.name}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default ContextMenu;
