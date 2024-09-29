import useChat from "../../hooks/chat/useChat"
export default function Chat() {
    const { roomList } = useChat()
    return (
        <div className="flex flex-col">
            <div className="font-bold m-2">客服聊天</div>
            <div className="flex flex-col m-2">
                {roomList.map((room) => (
                    <div key={room.id} className="w-full p-2 border border-gray-300 rounded-md mb-2 cursor-pointer hover:bg-red-300">{room.name}</div>
                ))}
            </div>
        </div>
    )
}