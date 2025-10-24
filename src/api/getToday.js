export default function getToday() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    console.log(day, month, year);

    return `${year}-${month.length == 2 ? month : "0" + month}-${day}`;
}
