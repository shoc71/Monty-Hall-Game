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
 * 50% Random chance of returning True/False 
 * @returns Boolean value
 */
function getRandomBoolean() {
   return (Math.random() < 0.5) // will output either true or false
}

/**
 * Shuffling Array using Durstenfeld shuffle (Optimized Fisher–Yates (aka Knuth) Shuffle).
 * 
 * @param {Array} list - List for shuffling
 * @returns - Returns shuffled array
 */
function shuffleArray(list) {
    for (var i = list.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
}

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
 * @param {{ [key: String]: string }} newDoors - \losingDoors\ Object to collect all losingValue Doors
 * @param {String} doorText - \doorText\ String used for filtering
 * @param {Boolean} xor - \xor\ Whether to include or exclude the string when filtering
 * @returns {{ [key: String]: string }} - Returning losingDoors Object keys and values from allDoors
 * 
 */
function collectingDoorData(allDoors, newDoors, doorText, xor = false) {
    
    if (xor === true) {
        for (const key in allDoors) {
            if (allDoors[key] !== doorText) {
                newDoors[key] = allDoors[key]
            }
        }
        return newDoors
    }
    
    if (xor === false) {
        for (const key in allDoors) {
            if (allDoors[key] === doorText) {
                newDoors[key] = allDoors[key]
            }
        }
        return newDoors
    }  
}

/**
 * Opening Empty Doors
 * 
 * @param {Object} allDoors - \allDoors\ All Doors Object with winningValues, losingValues, and OpenedValues
 * @param {Object} losingDoors - \losingDoors\ Object to filter out all losingValue Doors
 * @param {String} computerChoice - computerchoice as a String/Array is remember
 * @param {String} OpenedDoorText - String used for filtering
 * @returns {{ [key: String]: string }} - Returning losingDoors Object keys and values from allDoors
 */
function openEmptyDoor (allDoors, losingDoors, computerChoice, OpenedDoorText) {

    let randomSelection = selectingRandomDoor(losingDoors, computerChoice)

    allDoors[randomSelection] = OpenedDoorText
    delete losingDoors[randomSelection]
    
    // console.log(`Opened Door: ${randomSelection}`)

    return losingDoors
}

/**
 * Selecting Random Door
 * 
 * @param {Object} losingDoors - Objects doors to select keys 
 * @param {Array} computerChoice - Optional as String but Array to filter out from Object Options
 * @returns {String} - Returns a random key of the dictionary as a string
 */
function selectingRandomDoor(losingDoors, computerChoice) {
    const computerChoiceArray = Array.isArray(computerChoice) ? computerChoice : [computerChoice];

    let randomDoor = Object.keys(losingDoors).filter(key => !computerChoiceArray.includes(key))
    let randomSelection = randomDoor[Math.floor(Math.random() * randomDoor.length)]

    return randomSelection
}

/**
 * Checking whether the computer makes a switch for the door or not
 * 
 * @param {Object} allDoors - \allDoors\ All Doors Object with winningValues, losingValues, and OpenedValues
 * @param {Object} losingDoors - \losingDoors\ Object to filter out all losingValue Doors
 * @param {Array} computerChoice - Optional as String but Array to filter out from Object Options
 * @param {String} OpenedDoorText - String used for filtering
 * @returns 
 */
function switchAttempt(allDoors, losingDoors, computerChoice, OpenedDoorText) {
    
    let shuffledChoices = shuffleArray(computerChoice)
    const computerOptions = collectingDoorData(allDoors, losingDoors, OpenedDoorText, xor = true)
    const randomOption = selectingRandomDoor(computerOptions, shuffledChoices)
    const switchOption = getRandomBoolean();

    console.log(randomOption)

    if (switchOption === true) {
        console.log(`Switch Activated`)
        computerChoice.pop()
        computerChoice.push(randomOption)
    } else {
        // computerChoice = String(computerChoice)
        console.log(`Chose to Stay`)
    }

    return computerChoice
}

let victoryDoor = getRandomInterger(minRange, maxRange, loopNumber);
let computerChoice = getRandomInterger(minRange, maxRange, 2);

assignDoorValues(doors, winnerDoorText, LosingDoorText)
// console.log(doors)

emptyDoors = collectingDoorData(doors, emptyDoors, LosingDoorText)

console.log("Computer Choice: " + computerChoice)

openEmptyDoor(doors, emptyDoors, computerChoice, OpenedDoorText)
openEmptyDoor(doors, emptyDoors, computerChoice, OpenedDoorText)
openEmptyDoor(doors, emptyDoors, computerChoice, OpenedDoorText)
openEmptyDoor(doors, emptyDoors, computerChoice, OpenedDoorText)

console.log(victoryDoor)
console.log(emptyDoors)
console.log(doors)

switchAttempt(doors, emptyDoors, computerChoice, OpenedDoorText)

console.log(computerChoice)

