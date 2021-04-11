"use strict";
const start = async () => {
    let algoValue = Number(document.querySelector(".algo-menu").value);
    let speedValue = Number(document.querySelector(".speed-menu").value);

    if(speedValue === 0) {
        speedValue = 1;
    }
    if(algoValue === 0) {
        alert("Не выбран алгоритм");
        return;
    }

    switch(algoValue) {
        case 1:
            document.querySelector('.text').innerHTML = '<b>Сортировка пузырьком</b><br>Метод сортировки массивов и списков путем последовательного сравнения и обмена соседних элементов, если предшествующий оказывается больше последующего.'
            break
        case 2:
            document.querySelector('.text').innerHTML = '<b>Сортировка выбором</b><br>За каждый проход по массиву выбрать минимальный элемент (для сортировки по возрастанию) и поменять его местами с первым элементом в еще не отсортированном участке массива, тем самым уменьшив длину этого участка на один, и так до тех пор пока не будут отсортированы все элементы.'
            break
        case 3:
            document.querySelector('.text').innerHTML = '<b>Сортировка вставками</b><br>Элементы входной последовательности просматриваются по одному, и каждый новый поступивший элемент размещается в подходящее место среди ранее упорядоченных элементов.'
            break
        case 4:
            document.querySelector('.text').innerHTML = '<b>Сортировка слиянием</b><br>Исходный массив делится на части, пока в отдельных массивах станет не больше двух элементов. Сравнивается пара элементов. Затем элементы сравниваются с другим отсортированными элементами и объединяются в конечный массив.'
            break
        case 5:
            document.querySelector('.text').innerHTML = '<b>Быстрая сортировка :)</b><br>'
            break
    }

    let algorithm = new sortAlgorithms(speedValue);
    if(algoValue === 1)
        await algorithm.BubbleSort();
    if(algoValue === 2)
        await algorithm.SelectionSort();
    if(algoValue === 3)
        await algorithm.InsertionSort();
    if(algoValue === 4)
        await algorithm.MergeSort();
    if(algoValue === 5)
        await algorithm.QuickSort();
};

const RenderScreen = async () => {
    let algoValue = Number(document.querySelector(".algo-menu").value);
    await RenderList();
}

const RenderList = async () => {
    let sizeValue = Number(document.querySelector(".size-menu").value);
    await clearScreen();
    
    let list = await randomList(sizeValue);
    const arrayNode = document.querySelector(".array");
    for(const element of list)
    {
        const node = document.createElement("div");
        node.className = "cell";
        node.setAttribute("value", String(element));
        node.style.height = `${4*element}px`;
        arrayNode.appendChild(node);
    }
};

const RenderArray = async (sorted) => {
    let sizeValue = Number(document.querySelector(".size-menu").value);
    await clearScreen();

    let list = await randomList(sizeValue);
    if(sorted) list.sort((a, b) => a - b);

    const arrayNode = document.querySelector('.array');
    const divnode = document.createElement('div'); 
    divnode.className = 's-array';

    for(const element of list) {
        const dnode = document.createElement('div');
        dnode.className = 's-cell';
        dnode.innerText = element;
        divnode.appendChild(dnode);
    }
    arrayNode.appendChild(divnode);
}

const randomList = async (Length) => {
    let list = new Array();
    let lowerBound = 1;
    let upperBound = 100;

    for (let counter = 0; counter < Length ; ++counter) {
        let randomNumber = Math.floor(Math.random() * (upperBound - lowerBound + 1) 
            + lowerBound);
        list.push(parseInt(randomNumber));
    }
    return list;
};

const clearScreen = async () => {
    document.querySelector(".array").innerHTML = "";
};

const response = () => {
    let Navbar = document.querySelector(".navbar");
    if(Navbar.className === "navbar") {
        Navbar.className += " responsive";
    }
    else {
        Navbar.className = "navbar";
    }
};

document.querySelector(".icon").addEventListener("click", response)
document.querySelector(".start").addEventListener("click", start);
document.querySelector(".size-menu").addEventListener("change", RenderScreen);
document.querySelector(".algo-menu").addEventListener("change", RenderScreen);
window.onload = RenderScreen;