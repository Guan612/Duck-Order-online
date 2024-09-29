import { useEffect, useState } from "react"
import { getRoomByIdAPI } from "../../api/chat"

const useChatDetal = () => {
    const [roomName, setRoomName] = useState({})

    const getRoomName = async (id) => {
        const res = await getRoomByIdAPI(id)
        setRoomName(res)
    }

    useEffect(()=>{
    
    },[])
}

export default useChatDetal