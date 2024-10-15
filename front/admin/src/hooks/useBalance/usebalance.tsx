import { useEffect,useState } from "react";
import { getAllBalanceAPI } from "../../api/userbalance";
export default function useBalance() {
    const[balance,setBalance] = useState(0)
    const[balanceList,setBalanceList] = useState([])

    const getBalanceList = async ()=>{
        const res = await getAllBalanceAPI()
        if(res){
            setBalanceList(res)
        }
    }

    useEffect(()=>{
        getBalanceList()
    })

    return{balanceList}
}