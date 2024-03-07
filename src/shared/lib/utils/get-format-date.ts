export const getFormatDate = (unformatDate: string) => {
    const date = new Date(unformatDate);
    const year = date.getFullYear();

    const month = String(date.getMonth() + 1);
    const monthWithZero = month[1] ? month : `0${month[0]}`;

    const day = String(date.getDate());
    const dayWithZero = day[1] ? day : `0${day[0]}`;

    return `${dayWithZero}.${monthWithZero}.${year}`;
};
