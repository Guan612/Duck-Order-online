import Bottombar from "./bottombar";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
export default function layout() {
	return (
		<div className="flex flex-col">
			<div className="flex flex-row h-screen overflow-hidden">
				<div className="hidden md:block md:basis-1/6 flex-col bg-red-300">
					<Sidebar />
				</div>
				<div className="flex-1 flex-col md:basis-5/6 bg-blue-300 overflow-auto">
					<Outlet />
				</div>
			</div>

			{/* <div className="block md:hidden h-1/6">
				<Bottombar />
			</div> */}
		</div>
	);
}
