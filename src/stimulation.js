const switchWin = 0
const stayWin = 0
const minRange = 1
const maxRange = 4
let switchActivated = false
let doors = {}
let emptyDoors = {}

function getRandomInterger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// assuming only one door is the winning door
const victoryDoor = getRandomInterger(minRange, maxRange)
let computerChoice = getRandomInterger(minRange, maxRange)

for (let i = minRange; i <= maxRange; i++) {
    if (i == victoryDoor) {
        doors[i] = "Winner"
    } else {
        doors[i] = "Nothing"
    }
}

function removeItem (list, itemToRemove) {
    const itemsArray = Array.isArray(itemToRemove) ? itemToRemove : [itemToRemove];
    return list.filter(item => !itemsArray.includes(item));
}

// test = ['1','3', '4']
console.log(doors)

// bug - all doors opened if computerChoice = victoryDoor
for (const key in doors) {
    if (key !== String(victoryDoor) && key !== String(computerChoice)) {
        emptyDoors[key] = doors[key]
    }
}

console.log(emptyDoors)
const keys = Object.keys(emptyDoors)
let randomDoor = keys[Math.floor(Math.random() * keys.length)]
console.log(`Random Door: ${(randomDoor)}`)
doors[randomDoor] = "Opened"
delete (emptyDoors[randomDoor])


console.log("Computer Choice: " + computerChoice)
// console.log(doors)
console.log(emptyDoors)
console.log(doors)

computerOptions = []

for (const key in doors) {
    if (doors[key] !== "Opened") {
        computerOptions.push(key)
    }
    // console.log(doors[key])
}

console.log(`Doors Available: ${computerOptions}`)

let switchCheck = Math.floor(Math.random() * computerOptions.length)
console.log(computerOptions[switchCheck])

if (String(computerChoice) !== computerOptions[switchCheck]) {
    console.log(`Switch Activated`)
    switchCheck = true
    computerChoice = computerOptions[switchCheck]
    // console.log(`Computer Choice: ${computerChoice}`)
}  else {
    computerChoice = String(computerChoice)
    console.log(`Chose to Stay`)
}

if (computerChoice === String(victoryDoor)) {
    console.log("Computer has selected the correct door!")
} else {
    console.log("XXX - Computer has not selected the correct door!")
}

// console.log("Open Empty Door: ")
// console.log(emptyDoors)

// console.log(keys)