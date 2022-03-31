// flag to not continue if user entered invalid length.
var continueFlag = true;
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// calls password generate after criteria from user has been set
function generatePassword() { 
  passwordGenerator.resetProperties();
  setPasswordCriteria();
  var password = passwordGenerator.generatePassword();

  return password;
}

// contains all functions to prompt user and set properties of passwordGenerator object
function setPasswordCriteria(){
  promptAndSetLength();

  // flag used to not continue if user entered invalid length
  if (continueFlag){
    promptAndSetLowerCase();
    promptAndSetUpperCase();
    promptAndSetNumeric();
    promptAndSetSpecialChars();
  }
}

// prompts user for length, checks if length is valid, and sets passwordGenerator length property
function promptAndSetLength(){
  var userInput = window.prompt("How many characters would you like the password to be?\nEnter a number between 8 and 128:");
  var isValid = checkLengthIsValid(userInput);
  if (isValid){
    passwordGenerator.length = userInput;
    continueFlag = true;
  }
  else{
    displayErrorMsg("Length Invalid.\nMake sure to enter a number between 8 and 128.\nTry Again.");
    continueFlag = false;
  }
}

// determines if length is a number that is within bounds
function checkLengthIsValid(length){
  if (length >= 8 && length <= 128){
    return true;
  }
  else{
    return false;
  }
}

function displayErrorMsg(message){
  return window.alert(message);
}

// prompts user for option to include lower case characters. Sets passwordGenerator object lowerCase property.
function promptAndSetLowerCase(){
  var userInput = window.confirm("Do you want to include lower case characters?\n\nClick \"Ok\" for Yes.\nClick \"Cancel\" for No.");
  if (userInput){
    passwordGenerator.lowerCase = true;
  }
  else{
    passwordGenerator.lowerCase = false;
  }
}

// prompts user for option to include upper case characters. Sets passwordGenerator object upperCase property.
function promptAndSetUpperCase(){
  var userInput = window.confirm("Do you want to include upper case characters?\n\nClick \"Ok\" for Yes.\nClick \"Cancel\" for No.");
  if (userInput){
    passwordGenerator.upperCase = true;
  }
  else{
    passwordGenerator.upperCase = false;
  }
}

// prompts user for option to include numeric characters. Sets passwordGenerator object numeric property.
function promptAndSetNumeric(){
  var userInput = window.confirm("Do you want to include numbers?\n\nClick \"Ok\" for Yes.\nClick \"Cancel\" for No.");
  if (userInput){
    passwordGenerator.numeric = true;
  }
  else{
    passwordGenerator.numeric = false;
  }
}

// prompts user for option to include special characters. Sets passwordGenerator object specialChar property.
function promptAndSetSpecialChars(){
  var userInput = window.confirm("Do you want to include special characters?\n\nClick \"Ok\" for Yes.\nClick \"Cancel\" for No.");
  if (userInput){
    passwordGenerator.specialChars = true;
  }
  else{
    passwordGenerator.specialChars = false;
  }
}

// object to generate a password according to its properties
var passwordGenerator = {
  length: 0,
  lowerCase: false,
  upperCase: false,
  numeric: false,
  specialChars: false,

  // reset all properties. needed to not carry over previous password if user enters invalid length
  resetProperties(){
    this.length = 0;
    this.lowerCase = false;
    this.upperCase = false;
    this.numeric = false;
    this.specialChars = false;
  },

  // generates a password based on this' properties
  generatePassword(){
    var password = "";
    var functionList = this.generateFunctionList()

    if (functionList.length === 0){
      return "Click Generate Password.\nMake sure at least one criteria (lowercase, uppercase, numbers, special chars) is chosen.";
    }

    for (var i = 0; i <= this.length; i++){
      password += this.charAccordingToCriteria(functionList);
    }
    return password;
  },

  // makes a list of charSet functions based on this' properties
  generateFunctionList(){
    var functionList = [];

    if (this.lowerCase){
      functionList.push(charSets.getRandomLowerCaseLetter);
    }

    if (this.upperCase){
      functionList.push(charSets.getRandomUpperCaseLetter);
    }

    if (this.numeric){
      functionList.push(charSets.getRandomDigit);
    }

    if (this.specialChars){
      functionList.push(charSets.getRandomSpecialChar);
    }

    return functionList;
  },

  // randomly chooses a function in the function array and processes that function to return a random single char
  charAccordingToCriteria(functionList){
    var randomFunction = this.selectFromArrayAtRandom(functionList);
    var randomCharacter = randomFunction();
    return randomCharacter;
  },

  selectFromArrayAtRandom(array){
    return array[(Math.floor(Math.random() * array.length))];
  }
}

// collection of character sets and functions to return random a character from those sets
const charSets = {
  alphabet: "abcdefghijklmnopqrstuvwxyz",
  digits: "0123456789",
  specialCharacters: " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",

  getRandomLowerCaseLetter(){
    return charSets.alphabet.charAt(Math.floor(Math.random() * charSets.alphabet.length)).toLowerCase();
  },

  getRandomUpperCaseLetter(){
    return charSets.alphabet.charAt(Math.floor(Math.random() * charSets.alphabet.length)).toUpperCase();
  },

  getRandomDigit(){
    return charSets.digits.charAt(Math.floor(Math.random() * charSets.digits.length));
  },

  getRandomSpecialChar(){
    return charSets.specialCharacters.charAt(Math.floor(Math.random() * charSets.specialCharacters.length));
  },
}

