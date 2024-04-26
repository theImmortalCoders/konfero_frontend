export function updateLastVisitedPage(url: string) {
    document.cookie = `lastVisitedPage=${url}; path=/`;
}
