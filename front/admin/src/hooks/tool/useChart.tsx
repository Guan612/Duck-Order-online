import { useEffect, useRef } from "react";
import * as echarts from "echarts";

function useChart(chartRef, data, getOption) {
	const chartInstanceRef = useRef(null);

	useEffect(() => {
		// 初始化图表实例
		if (chartRef.current && !chartInstanceRef.current) {
			chartInstanceRef.current = echarts.init(chartRef.current);
		}

		if (chartInstanceRef.current && data.length) {
			const option = getOption(data); // 获取图表配置
			chartInstanceRef.current.setOption(option); // 设置图表
		}

		// 清理函数，用于组件卸载时销毁图表实例
		return () => {
			if (chartInstanceRef.current) {
				chartInstanceRef.current.dispose(); // 销毁图表实例
				chartInstanceRef.current = null; // 清除引用
			}
		};
	}, [chartRef.current, data]); // 依赖图表引用和数据变化

	return chartInstanceRef.current;
}

export default useChart;
