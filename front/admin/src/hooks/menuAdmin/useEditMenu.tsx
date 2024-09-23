import { ChangeIsShellAPI } from "../../api/menu";
export default function useEditMenu() {
	const changeSell = async (id: string, isSell: number) => {
		if (isSell === 1) {
			isSell = 0;
		} else {
			isSell = 1;
		}
		const res = await ChangeIsShellAPI(id, isSell);
	};

	return { changeSell };
}
