import { useState } from "react"
import { updateUserAPI } from "../../api/user"
import { cost } from "../../dto/cost"

const userSetAdmin =  () => {
    const [user,setUser] = useState({})

    const setAdmin = async (id:string) => {
        const res = await updateUserAPI(id,{cost:2})
        console.log(res)
        setUser(res)
    }

    return {setAdmin}
    
}

export default userSetAdmin