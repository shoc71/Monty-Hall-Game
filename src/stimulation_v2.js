// Constants
const minRange = 1
const maxRange = 11
const winnerDoorText = "Winner"
const LosingDoorText = "Nothing"
const OpenedDoorText = "Opened"
const loopNumber = 3

let switchWin = 0
let stayWin = 0
let switchCheck = false
let doors = {}
let emptyDoors = {}

/**
 * Assigning Random (Array) of Numbers to a given variable. LoopNumber > 1, for an Array<String> values
 * 
 * @param {Interger} min 
 * @param {Interger} max 
 * @param {Interger} loopNumber 
 * @returns {Array || String} Multiple Options in Array<String>, else String []
 * 
 *  Expected external variables:
 * - minRange: Interger (e.g., 1)
 * - maxRange: Interger (e.g., 3)
 * - loopNumber: Interger (e.g., 1)
 */
function getRandomInterger(min, max, loopNumber = 1) {
    tempArray = []

    while (tempArray.length < loopNumber) {

        // Made as String to make comparing with array/object easier
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

/**
 * Assigns values to doors based on whether they are winning or losing doors.
 *
 * @param {{ [key: String]: string }} doorOptions - An object representing doors to be assigned values.
 * @param {String} winnerDoorText - Winner Door Value.
 * @param {string} losingDoorText - Loser Door Value.
 * @returns {Object} The updated doorValues object with assigned (0/1) values.
 *
 */
function assignDoorValues (doorOptions, winnerDoorText, LosingDoorText) {
    for (let i = minRange; i <= maxRange; i++) {
        index = String(i);
        if (victoryDoor.includes(index)) {
            doorOptions[i] = winnerDoorText
        } else {
            doorOptions[i] = LosingDoorText
        }
    }

    return doorOptions
}

/**
 * Collecting all Empty/Losing Doors into an Object for future runs and reference. Returns all "empty" doors
 * 
 * @param {{ [key: String]: string }} allDoors - \allDoors\ All Doors Object with both winningValues and losingValues
 * @param {{ [key: String]: string }} losingDoors - \losingDoors\ Object to collect all losingValue Doors
 * @returns {{ [key: String]: string }} - Returning losingDoors Object keys and values from allDoors
 * 
 */
function collectingEmptyDoors(allDoors, losingDoors, losingDoorText) {
    for (const key in allDoors) {
        if (allDoors[key] === losingDoorText) {
            losingDoors[key] = allDoors[key]
        }
    }

    return losingDoors
}

/**
 * 
 * @param {Object} allDoors - \allDoors\ All Doors Object with winningValues, losingValues, and OpenedValues
 * @param {Object} losingDoors - \losingDoors\ Object to filter out all losingValue Doors
 * @param {String} computerChoice - computerchoice as a String/Array is remember
 * @param {String} OpenedDoorText - Open Door Text
 * @returns {{ [key: String]: string }} - Returning losingDoors Object keys and values from allDoors
 */
function openEmptyDoor (allDoors, losingDoors, computerChoice, OpenedDoorText) {

    const computerChoiceArray = Array.isArray(computerChoice) ? computerChoice : [computerChoice];

    let randomDoor = Object.keys(losingDoors).filter(key => !computerChoiceArray.includes(key))
    let randomSelection = randomDoor[Math.floor(Math.random() * randomDoor.length)]

    allDoors[randomSelection] = OpenedDoorText
    delete losingDoors[randomSelection]
    
    console.log(`Opened Door: ${randomSelection}`)

    return losingDoors
}

let victoryDoor = getRandomInterger(minRange, maxRange, loopNumber);
let computerChoice = getRandomInterger(minRange, maxRange, 2);

assignDoorValues(doors, winnerDoorText, LosingDoorText)
console.log(doors)

emptyDoors = collectingEmptyDoors(doors, emptyDoors, LosingDoorText)

console.log("Computer Choice: " + computerChoice)

openEmptyDoor(doors, emptyDoors, computerChoice, OpenedDoorText)
openEmptyDoor(doors, emptyDoors, computerChoice, OpenedDoorText)
openEmptyDoor(doors, emptyDoors, computerChoice, OpenedDoorText)
openEmptyDoor(doors, emptyDoors, computerChoice, OpenedDoorText)

console.log(victoryDoor)
console.log(emptyDoors)
console.log(doors)

function switchAttempt(allDoors, losingDoors, computerChoice, OpenedDoorText) {

    const computerChoiceArray = Array.isArray(computerChoice) ? computerChoice : [computerChoice];
    computerOptions = []

    for (const key in allDoors) {
        if (allDoors[key] !== OpenedDoorText) {
            computerOptions.push(key)
        }
    }

    return computerOptions


}

console.log(switchAttempt(doors, emptyDoors, computerChoice, OpenedDoorText))