import { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";

export default function useResponsiveChart(
	chartRef: React.MutableRefObject<ReactECharts | null>
) {
	useEffect(() => {
		const resizeChart = () => {
			if (chartRef.current) {
				chartRef.current.getEchartsInstance().resize();
			}
		};

		window.addEventListener("resize", resizeChart);

		// 清理监听器，避免内存泄漏
		return () => {
			window.removeEventListener("resize", resizeChart);
		};
	}, [chartRef]);
}
