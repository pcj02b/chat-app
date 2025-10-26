// utils
const createListItem = (innerHtml: string) => {
    let element = document.createElement('li')
    element.innerHTML = innerHtml;
    return (element);
};

const utils = {
    createListItem,
}

export default utils; 