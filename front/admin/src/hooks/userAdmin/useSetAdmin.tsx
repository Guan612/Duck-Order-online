import { useState } from "react"
import { updateUserAPI, deleteUserAPI} from "../../api/user"
import { cost } from "../../dto/cost"

const userSetAdmin =  () => {
    const [user,setUser] = useState({})

    const setAdmin = async (id:string) => {
        const res = await updateUserAPI(id,{cost:2})
        setUser(res)
    }

    const setWaiter = async (id:string) => {
        const res = await updateUserAPI(id,{cost:1})
        setUser(res)
    }

    const deleteUser = async (id:string) => {
        const res = await deleteUserAPI(id)
        return res
    }
    return {setAdmin,setWaiter,deleteUser,user}
    
}

export default userSetAdmin