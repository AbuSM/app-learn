export function getMilliseconds(millisecond) {
	let answer = millisecond - Math.floor(millisecond / 1000) * 1000;

	if (answer >= 100) {
		return Math.floor(answer / 10);
	}
	if (answer < 10) {
		return "0" + String(answer);
	}
	return answer;
}
