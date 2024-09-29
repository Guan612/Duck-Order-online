import { useEffect, useState } from "react"
import { getRoomByIdAPI, getRoomListAPI } from "../../api/chat"
import { message } from "antd"
const useChat = () => {
    const [roomName, setRoomName] = useState({})
    const [roomList, setRoomList] = useState([])

    const getRoomList = async () => {
        const res = await getRoomListAPI();
        if (!res) {
            message.error('没有聊天哦')
            return
        }
        setRoomList(res)
    }
    const getRoomName = async (id) => {
        const res = await getRoomByIdAPI(id)
        setRoomName(res)
    }

    useEffect(() => {
        getRoomList()
    }, [])

    return { roomList, roomName, getRoomName }
}
export default useChat