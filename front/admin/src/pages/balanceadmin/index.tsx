import useBalance from "../../hooks/useBalance/usebalance"
import balance from "../../dto/balance"
import { Button, InputNumber } from "antd"
export default function BalanceAdmin() {
    const {balanceList,balance,changeBalance,changeBalanceValue} = useBalance()
    return(
        <>
            <div className="flex flex-col">
                <h1 className="text-xl font-bold mb-4 text-center">用户余额管理</h1>
                {balanceList.map((item:balance)=>(
                    <div className="flex flex-row items-center m-2">
                        <div>{item.loginId}</div>
                        <div className="mx-2">剩余余额：{item.balance}</div>
                        <InputNumber className="mx-2" min={1} defaultValue={item.balance} onChange={changeBalanceValue}  changeOnWheel></InputNumber>
                        <Button type="primary" onClick={()=>{changeBalance(item.id, balance)}}>修改余额</Button>
                    </div> 
                ))}
            </div>
        </>
    )
}