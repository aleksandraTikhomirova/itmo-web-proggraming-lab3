const formatter = new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "short",
    timeStyle: "medium"
});
for (const element of document.querySelectorAll("time[datetime]")) {
    const date = new Date(element.dateTime);
    element.textContent = formatter.format(date);
}