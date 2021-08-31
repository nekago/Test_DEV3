let movementElement = null;
let elementPositions = [];


let pickedElementPosition = {
    left: null,
    top: null
};

function submitEventFunction(event) {
    event.preventDefault();
    restartForm()
    let str = stringToArrayChars(event.target[0].value);
    let parentNode = document.getElementById("str");
    str.forEach((element, index) => {
        let childrenNode = document.createElement("div");
        childrenNode.innerText = element;
        childrenNode.id = index;
        childrenNode.style.left = `${(index + 1) * 15}px`;
        childrenNode.addEventListener("click", pickMovingElement);
        parentNode.appendChild(childrenNode);
    });
    for (let i = 0; i < parentNode.children.length; i++) {
        elementPositions[i] = {
            top: parentNode.children[i].offsetTop,
            left: parentNode.children[i].offsetLeft
        }
    }
}

function pickMovingElement(event) {
    if (movementElement) return;
    movementElement = event.target;


    pickedElementPosition = elementPositions[movementElement.id]


    document.addEventListener("mousemove", moveElement);
    setTimeout(() => document.addEventListener("click", stopMoveElement), 0);
}

function moveElement(event) {
    movementElement.style.left = `${event.clientX - 10}px`;
    movementElement.style.top = `${event.clientY - 25}px`;
}

function stopMoveElement(event) {
    setTimeout(() => movementElement = null, 0);

    document.removeEventListener("mousemove", moveElement);
    document.removeEventListener("click", stopMoveElement);

    checkFreeNewPosition()

}





function checkFreeNewPosition() {
    elementPositions.forEach((element, index) => {
        if (index === +movementElement.id) return false


        const layeringTop = (
            (movementElement.offsetTop >= element.top
                && movementElement.offsetTop <= element.top + 25)
            || (movementElement.offsetTop + 25 >= element.top
                && movementElement.offsetTop + 25 <= element.top + 25)
        );

        const layeringLeft = (
            (movementElement.offsetLeft >= element.left
                && movementElement.offsetLeft <= element.left + 15)
            || (movementElement.offsetLeft + 15 >= element.left
                && movementElement.offsetLeft + 15 <= element.left + 15)
        );
        if (layeringLeft && layeringTop) {
            swapElements(element, index)
        } else {
            setNewPositionElement()
        }
    })
}

function swapElements(passiveElementPosition, passiveElementIndex) {
    const passiveElement = document.getElementById(String(passiveElementIndex));

    passiveElement.style.top = `${pickedElementPosition.top}px`
    passiveElement.style.left = `${pickedElementPosition.left}px`
    elementPositions[passiveElementIndex] = {
        top: pickedElementPosition.top,
        left: pickedElementPosition.left
    };

    movementElement.style.top = `${passiveElementPosition.top}px`
    movementElement.style.left = `${passiveElementPosition.left}px`
    elementPositions[movementElement.id] = {
        top: passiveElementPosition.top,
        left: passiveElementPosition.left
    };
}

function setNewPositionElement() {
    elementPositions[movementElement.id] = {
        top: movementElement.offsetTop,
        left: movementElement.offsetLeft
    };
}

function restartForm() {
    pickedElementPosition.left = null;
    pickedElementPosition.top = null;
    movementElement = null
    elementPositions = []
    document.getElementById('str').innerHTML = ""
}






function stringToArrayChars(str) {
    return str.split('');
}

document.addEventListener("submit", submitEventFunction);

