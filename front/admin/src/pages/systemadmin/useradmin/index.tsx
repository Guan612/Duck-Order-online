import { Button } from "antd";
import useGetUserlist from "../../../hooks/userAdmin/useGetUserlist";
import userSetAdmin from "../../../hooks/userAdmin/useSetAdmin";

export default function UserAdmin() {
    const { users, getRoleName } = useGetUserlist();
    const { setAdmin } = userSetAdmin();
    return (
        <>
            <h1 className="text-3xl font-bold m-4">用户管理</h1>
            <ul>
                {users.map((user) => (
                    <div className="flex justify-around-between items-center bg-white rounded-md m-2">
                        <div className="m-2 flex" key={user.id}>
                            <div className="m-1">{user.loginId}</div>
                            <div className="m-1">{getRoleName(user.cost)}</div>
                        </div>
                        <div className="flex m-1">
                            <Button
                                className="m-1"
                                type="primary"
                                onClick={() => setAdmin(user.id)}
                            >
                                设置为管理员
                            </Button>
                            <Button className="m-1" type="primary">
                                重置密码
                            </Button>
                            <Button className="m-1" type="primary" danger>
                                删除用户
                            </Button>
                        </div>
                    </div>
                ))}
            </ul>
        </>
    );
}
