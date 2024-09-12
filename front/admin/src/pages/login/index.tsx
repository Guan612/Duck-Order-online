import { Button, Form, Input } from "antd";
import useLogin from "../../hooks/login/uselogin";
import { NavLink } from "react-router-dom";

export default function Login() {
	const { onFinish, onFinishFailed } = useLogin();
	const logoImg =
		"https://upload.wikimedia.org/wikipedia/commons/1/1a/Dolby_logo_2019.svg";

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="flex flex-col items-center p-6 md:p-10 lg:p-15 rounded-lg card shadow-2xl bg-gradient-to-r from-transblue to-transpink">
				<div className="flex items-center mb-4">
					<div className="mr-2 md:m-3 lg:m-8 hidden md:block">
						<img src={logoImg} alt="logo" className="w-12 h-10" />
					</div>
					<Form
						name="basic"
						labelCol={{
							span: 8,
						}}
						wrapperCol={{
							span: 16,
						}}
						style={{
							maxWidth: 600,
						}}
						initialValues={{
							remember: true,
						}}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
					>
						<Form.Item
							label="用户id"
							name="loginId"
							rules={[
								{
									required: true,
									message: "请输入你的用户id",
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="密码"
							name="password"
							rules={[
								{
									required: true,
									message: "请输入你的密码",
								},
							]}
						>
							<Input.Password />
						</Form.Item>

						<Form.Item
							wrapperCol={{
								offset: 8,
								span: 16,
							}}
						>
							<Button type="primary" htmlType="submit">
								登录
							</Button>
						</Form.Item>
					</Form>
				</div>
				<NavLink
					to={"/auth/register"}
					className={"text-sm text-blue-400"}
				>
					还没注册？
				</NavLink>
			</div>
		</div>
	);
}
