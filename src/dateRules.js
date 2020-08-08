const dateRules = (() => {
    const dateFormat = 'MM/dd/yyyy';
    const prettyDateToHTMLType = (date) => {
        let years = date.substring(6, 10);
        let days = date.substring(3, 5);
        let months = date.substring(0,2);
        let newDate = `${years}-${months}-${days}`;
        return newDate;
    }

    return {
        dateFormat,
        prettyDateToHTMLType
    }
})();

export { dateRules };