export function formatDateTime(dateTime: string): string {
    const tmp = new Date(dateTime);
    if (isNaN(tmp.getTime())) {
        return dateTime;
    }
    return `${tmp.getDate().toString().padStart(2, '0')}.${(tmp.getMonth() + 1).toString().padStart(2, '0')}.${tmp.getFullYear()} ${tmp.getHours().toString().padStart(2, '0')}:${tmp.getMinutes().toString().padStart(2, '0')}:${tmp.getSeconds().toString().padStart(2, '0')}`;
}