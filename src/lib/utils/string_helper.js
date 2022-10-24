function slugify(input) {
    return input.toLowerCase().replace(/ /g, "_");
}

function order_by_date_str_desc(date_str1, date_str2) {
    const date1 = new Date(date_str1.date).getTime()
    const date2 = new Date(date_str2.date).getTime();
    if (date1 < date2) {
        return 1;
    } else if (date1 > date2) {
        return -1;
    } else {
        return 0;
    }
}

function format_date_string(date) {
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    return `${ye}-${mo}-${da}`;
}

export {
    slugify, order_by_date_str_desc, format_date_string
};
