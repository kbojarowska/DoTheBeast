function groupByCount(arr) {
	const countMap = {}

	arr.forEach((item) => {
		countMap[item] = (countMap[item] || 0) + 1
	})

	const result = Object.entries(countMap).map(([item, count]) => ({
		item: parseInt(item),
		count,
	}))

	return result
}

export default groupByCount