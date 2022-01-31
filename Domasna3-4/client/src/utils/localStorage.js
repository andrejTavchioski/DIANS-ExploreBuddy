export const setLocalStorage = (name, obj) => {
    localStorage.setItem(name, JSON.stringify(obj));
}

export const getFromLocalStorage = (name) => {
    return JSON.parse(localStorage.getItem(name));
}
