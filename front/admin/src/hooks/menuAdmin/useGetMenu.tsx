import { useState } from "react";
import { getMenuListAPI } from "../../api/menu";
export default function useGetMenu() {
    const[menuList,setMenuList] = useState([])

    const getMenuList = async()=>{
        const res = await getMenuListAPI()
        setMenuList(res)
    }



    return{getMenuList,menuList}
}