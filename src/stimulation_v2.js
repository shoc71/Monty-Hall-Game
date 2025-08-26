let switchWin = 0
let stayWin = 0
const minRange = 1
const maxRange = 7
let switchActivated = false
let loopNumber = 3
let doors = {}
let emptyDoors = {}

function getRandomInterger(min, max, loopNumber = 1) {
    tempArray = []

    while (tempArray.length < loopNumber) {
        randomNumber = String(Math.floor(Math.random() * (max - min + 1)) + min);
        
        if (!tempArray.includes(randomNumber)) {
            tempArray.push(randomNumber)
        }        
    }

    if (loopNumber !== 1) {
        return tempArray;
    } else {
        return tempArray.toString();
    }
}

// assuming only one door is the winning door
let victoryDoor = getRandomInterger(minRange, maxRange, loopNumber)
let computerChoice = getRandomInterger(minRange, maxRange)

console.log(victoryDoor)
// console.log(`Correct Doors: ${victoryDoor} - Computer Choice: ${computerChoice}`)

// Assign doors their values
for (let i = minRange; i <= maxRange; i++) {
    index = String(i)
    if (victoryDoor.includes(index)) {
        doors[i] = "Winner"
    } else {
        doors[i] = "Nothing"
    }
}

console.log(doors)

for (const key in doors) {
    if (key in victoryDoor || key === computerChoice) {
        continue
    } else {
        emptyDoors[key] = doors[key]
    }
}

console.log("Computer Choice: " + computerChoice)
console.log(emptyDoors)
const keys = Object.keys(emptyDoors)
let randomDoor = keys[Math.floor(Math.random() * keys.length)]
console.log(`Random Door: ${(randomDoor)}`)
doors[randomDoor] = "Opened"
delete (emptyDoors[randomDoor])
console.log(emptyDoors)
console.log(doors)


