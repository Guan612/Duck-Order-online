import { SmileOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";

const [api, contextHolder] = notification.useNotification();

const openNotification = () => {
    api.info({
        message: "Notification Title",
        description:
            "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
        icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
};