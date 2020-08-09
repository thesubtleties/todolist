const dateRules = (() => {
  const dateFormat = 'MM/dd/yyyy';
  const prettyDateToHTMLType = (date) => {
    const years = date.substring(6, 10);
    const days = date.substring(3, 5);
    const months = date.substring(0, 2);
    const newDate = `${years}-${months}-${days}`;
    return newDate;
  };

  return {
    dateFormat,
    prettyDateToHTMLType,
  };
})();

export { dateRules };
