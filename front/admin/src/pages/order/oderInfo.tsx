import { Button, message } from "antd";

import useOderInfo from "../../hooks/order/useOderInfo";
export default function OrderInfo() {
    const {orderMessage,testOrder} = useOderInfo()

    return (
        <div>
            <h1>订单信息</h1>
            <Button onClick={testOrder}>测试链接</Button>
            {orderMessage && <p>{orderMessage}</p>}
        </div>
    );
}