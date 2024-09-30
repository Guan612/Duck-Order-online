import { useEffect, useState } from "react";
import useSocket from "../../api/socket";
import { message } from "antd";
export default function useOderInfo() {
  const socket = useSocket("order");
  const [orderMessage, setOrderMessage] = useState([]);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const testOrder = () => {
    socket.emit("haveNewOder", {
      message: "张佳宁是原批",
    });
  };

  useEffect(() => {
    const handleNewOrder = (data) => {
      if (data) {
        speak(data.message);
        message.info(data.message);
        setOrderMessage(data.message);
      }
    };

    socket.on("haveNewOder", handleNewOrder);

    // 清理连接
    return () => {
      socket.off("haveNewOder", handleNewOrder);
    };
  }, [socket]);

  return { orderMessage, testOrder };
}
