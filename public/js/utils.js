// utils
const createListItem = (innerHtml) => {
    let element = document.createElement('li')
    element.innerHTML = innerHtml;
    return (element);
};
export default {
    createListItem,
}; 