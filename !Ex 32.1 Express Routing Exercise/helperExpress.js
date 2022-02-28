function createFrequencyCounter(arr) {
	return arr.reduce(function(acc, next) {
		acc[next] = (acc[next] || 0) + 1;
		return acc;
	}, {});
}

//Checks to ensure that all entries are numbers
function notNumber(strings) {
	let result = [];
	for (let i = 0; i < strings.length; i++) {
		let validateNum = Number(strings[i]);
		if (Number.isNaN(validateNum )) {
			return new Error(`This '${strings[i]}' at index ${i} is not a number.`);
		}
		result.push(validateNum);
	}
	return result;
}

//Determines the mean of a set of numbers
function findMean(nums) {
	if (nums.length === 0) return 0;
	return (
		nums.reduce(function(acc, cur) {
			return acc + cur;
		}) / nums.length
	);
}

//Determines the median of a set of numbers
function findMedian(nums) {
	nums.sort((a, b) => a - b);
	let index = Math.floor(nums.length / 2);
	let median;
	if (nums.length % 2 === 0) {
		median = (nums[index] + nums[index - 1]) / 2;
	}
	else {
		median = nums[index];
	}
	return median;
}

//Determines the mode of a set of numbers.
function findMode(arr) {
	let freqCounter = createFrequencyCounter(arr);
	let count = 0;
	let mostFrequent;

	for (let key in freqCounter) {
		if (freqCounter[key] > count) {
			mostFrequent = key;
			count = freqCounter[key];
		}
	}
	return mostFrequent;
}


module.exports = {
	createFrequencyCounter,
	findMean,
	findMedian,
	findMode,
	notNumber
};