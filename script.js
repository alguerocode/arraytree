fetch("./data.json")
.then(response => response.json())
.then(json=> populateList(Object.entries(json)))

let myUL = document.createElement("ul")
document.body.append(myUL)

let inputsList = []
let liList = []
let dads = [] //guarda os valores que serão adicionados na dadsList(usada pelo storage dadsData)

// localStorage.clear()
let sonsData = JSON.parse(localStorage.getItem('sons')) || [];
let dadsData = JSON.parse(localStorage.getItem('dads')) || [];
let sonsList = []
let dadsList = []

let sonsCounter = 0
let dadsCounter = 0

function populateList(array){
    for (let i = 0; i < array.length; i++){
        let li = document.createElement('li')
        let check = document.createElement('input')
        check.setAttribute("type","checkbox")
        check.setAttribute("level", array[i][1]['level'])
        check.addEventListener("click", clicked, false)
        li.appendChild(check)

        sonsList = runData(sonsData)
        dadsList = runData(dadsData)

        for (let j = 0; j < dadsList.length; j++){
            for (let k = 0; k < sonsList.length; k++){
                if (dadsList[j]==sonsList[k]){
                    dadsList.splice(j, 1)
                }
            }
        }
        for (let j = 0; j < dadsList.length; j++){
            if (dadsList[j] == dadsCounter){
                if(sonsList.find(isTrue)){
                    check.checked = true
                    check.indeterminate = false
                    dadsList.splice(j, 1)
                    break
                }
                else{
                    check.indeterminate = true
                    break
                }
            }
        }
        dadsCounter++

        for (let f = 0; f<sonsList.length; f++){
            if(sonsList[f]==sonsCounter){
                check.checked = true
                break
            }
        }
        sonsCounter++

        let label = document.createElement("label")
        label.textContent = array[i][1]['name']
        label.addEventListener("dblclick", hideAndShow, false)

        li.appendChild(label)
        li.setAttribute("visible", true)

        let item = []
        item.push(array[i][1]['name'])
        item.push(array[i][1]['level'])
        inputsList.push(item)

        switch(array[i][1]['level']){
            case 0:
                myUL.appendChild(li)
                break
            case 1:
                let ul = document.createElement("ul")

                ul.appendChild(li)
                myUL.appendChild(ul)
                break
            case 2:
                let ul2 = document.createElement("ul")
                let ul22 = document.createElement("ul")

                ul2.appendChild(li)
                ul22.appendChild(ul2)
                myUL.appendChild(ul22)
                break
            case 3:
                let ul3 = document.createElement("ul")
                let ul33 = document.createElement("ul")
                let ul333 = document.createElement("ul")

                ul3.appendChild(li)
                ul33.appendChild(ul3)
                ul333.appendChild(ul33)
                myUL.appendChild(ul333)
                break
            case 4:
                let ul4 = document.createElement("ul")
                let ul44 = document.createElement("ul")
                let ul444 = document.createElement("ul")
                let ul4444 = document.createElement("ul")

                ul4.appendChild(li)
                ul44.appendChild(ul4)
                ul444.appendChild(ul44)
                ul4444.appendChild(ul444)
                myUL.appendChild(ul4444)
                break
        }

        if (array[i][1]['children'] != {}){
            let newArray = Object.entries(array[i][1]['children'])
            populateList(newArray)
        }
    } 
}

//ideia: pegar todos os elementos do DOM e checar em qual nível está o name único
//enquanto o próximo elemento for de nível menor, o name deve ganhar um check

//transformar json em array (como na função de cima)
//percorrer o array até achar o name
//pegar o level
//comparar os próximos elementos com o level
//se forem menores, dar um check
//se for maior, sair do laço e sair da função


function clicked(){
    let inputs = document.getElementsByTagName('input')
    let li = document.getElementsByTagName('li')
    let name = this.parentNode.children[1].textContent
    let level
    let position
    let sons = []

    for (let i = 0; i < inputsList.length; i++){
        if (inputsList[i][0] == name){
            level = parseInt(inputsList[i][1])
            position = parseInt(i)
            break
        }
        else{
            dads.push(inputs[i])
            liList.push(li[i])
        }
    }
    let comparingLevel = level+1

    if (this.checked){
        sonsList = []
        dadsList = []
        sonsList.push(position)
        while(comparingLevel > level){
            position++
            comparingLevel = parseInt(inputsList[position][1], 10)
            if (comparingLevel > level){
                sons.push(inputsList[position][0])
                inputs[position].checked = true
                inputs[position].indeterminate = false
                sonsList.push(position)
            }
        }

        noRepeat(sonsData, sonsList, "sons")
        dads = ordenateDads()

        for (let i = 0; i < dads.length; i++){
            if (parseInt(dads[i].getAttribute('level')) >= level){
                dadsList.splice(i, 1)
            }
            else{
                dads[i].indeterminate = true
                liList[i].style.backgroundColor = "rgb(169, 199, 228)"
                dadsList.push(i)
            }
        }

        noRepeat(dadsData, dadsList, "dads")
    }
    else{
        while(comparingLevel > level){
            position++
            comparingLevel = parseInt(inputsList[position][1], 10)
            if (comparingLevel > level){
                sons.splice(inputsList[position][0], 1)
                inputs[position].checked = false
                inputs[position].indeterminate = false
            }
        }
        
        noRepeat(sonsData, sons, "sons")
        
        for (let i = 0; i < dads.length; i++){
            dads[i].indeterminate = false
            liList[i].style.backgroundColor = ""
        }

        noRepeat(dadsData, dads, "dads")
    }      
}

function hideAndShow(){
    let lis = document.getElementsByTagName('li')
    let name = this.parentNode.textContent
    let level
    let position

    for (let i = 0; i < inputsList.length; i++){
        if (inputsList[i][0] == name){
            level = parseInt(inputsList[i][1])
            position = parseInt(i)
            break
        }
    }
    let comparingLevel = level+1


    if(this.getAttribute('visible')=='false'){
        while(comparingLevel > level){
            position++
            comparingLevel = parseInt(inputsList[position][1], 10)
            if (comparingLevel > level){
                lis[position].style.display = "list-item"
            }
        }
        this.setAttribute('visible', true)
        return 
    }

    while(comparingLevel > level){
        position++
        comparingLevel = parseInt(inputsList[position][1], 10)
        if (comparingLevel > level){
            lis[position].style.display = "none"
        }
        this.setAttribute('visible', false)
    }   
    return 
}

function saveToStorage(storage, variable){
    localStorage.setItem(storage, JSON.stringify(variable))
}

function isTrue(){
    for (let i=0; i < sonsList.length; i++){
        for (let j=0; j < dadsList.length; j++){
            return sonsList[i]==dadsList[j]
        }
    }
    return false
}

function runData(browsed){
    list = 0
    for (b of browsed){
        list = b
        break
    }
    return list
}

function noRepeat(datas, list, storage){
    datas.pop()
    var noRepeat = list.filter(function(el, i) {
        return list.indexOf(el) === i;
    });
    list = noRepeat
    datas.push(list)
    saveToStorage(storage, datas)
}

function ordenateDads(){
    var noRepeatDads = dads.filter(function(el, i) {
        return dads.indexOf(el) === i;
    });
    dads = noRepeatDads

    ordering = []
    for (let i = 0; i < dads.length; i++){
        for (let j = 0; j < dads.length; j++){
            if (parseInt(dads[j].getAttribute('level')) == i){
                ordering.push(dads[j])
            }
        }
    }

    return ordering
}