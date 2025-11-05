export default function getToday() {
    const today = new Date();
    const day = today.getDate().toString();
    const month = (today.getMonth() + 1).toString();
    const year = today.getFullYear().toString();

    return `${year}-${month.length == 2 ? month : "0" + month}-${
        day.length == 2 ? day : "0" + day
    }`;
}
