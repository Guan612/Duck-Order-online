import { useEffect,useState } from "react";
import { getAllBalanceAPI, updateUserbalanceAPI } from "../../api/userbalance";
import { message } from "antd";
export default function useBalance() {
    const[balance,setBalance] = useState(0)
    const[balanceList,setBalanceList] = useState([])

    const getBalanceList = async ()=>{
        const res = await getAllBalanceAPI()
        if(res){
            setBalanceList(res)
        }
    }
    const changeBalanceValue = (value:number)=>{
        setBalance(value)
    }

    const changeBalance = async (id:number,balance:number)=>{
        const res = await updateUserbalanceAPI(id,balance)
        if(res){
            message.success('修改成功')
            getBalanceList()
        }
    }

    useEffect(()=>{
        getBalanceList()
    },[])

    return{balanceList,balance,changeBalance,changeBalanceValue}
}