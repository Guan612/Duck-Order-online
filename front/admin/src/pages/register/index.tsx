import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import RegisterDto from "../../dto/register";
import useRegister from "../../hooks/register/useRegister";

export default function Register() {
	const { onFinish, onFinishFailed } = useRegister();
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="flex flex-col items-center p-6 md:p-10 lg:p-15 rounded-lg card shadow-2xl bg-gradient-to-r from-transblue to-transpink">
				<div className="flex items-center mb-4">
					<Form
						name="basic"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 16 }}
						style={{ maxWidth: 600 }}
						initialValues={{ remember: true }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
					>
						<Form.Item<RegisterDto>
							label="用户id"
							name="loginId"
							rules={[
								{
									required: true,
									message: "用户id不能为空",
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item<RegisterDto> label="用户名" name="nickname">
							<Input />
						</Form.Item>

						<Form.Item<RegisterDto>
							label="密码"
							name="password"
							rules={[
								{
									required: true,
									message: "密码不能为空",
								},
							]}
						>
							<Input.Password />
						</Form.Item>

						<Form.Item<RegisterDto> label="电子邮件" name="email">
							<Input />
						</Form.Item>

						<Form.Item<RegisterDto>
							//name="accept"
							valuePropName="checked"
							rules={[
								{
									required: true,
									message: "请勾选用户协议",
								},
							]}
							wrapperCol={{ offset: 8, span: 16 }}
						>
							<Checkbox>我已同意用户协议</Checkbox>
						</Form.Item>

						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button type="primary" htmlType="submit">
								注册
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
}
