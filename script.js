var continueFlag = true;
var generateBtn = document.querySelector("#generate");

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

var passwordGenerator = {
  length: 0,
  lowerCase: false,
  upperCase: false,
  numeric: false,
  specialChars: false,

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

  charAccordingToCriteria(functionList){
    var randomFunction = this.selectRandomFunction(functionList);
    var randomCharacter = randomFunction();
    return randomCharacter;
  },

  selectRandomFunction(functionList){
    return functionList[(Math.floor(Math.random() * functionList.length))];;
  },

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
  }
}








function displayErrorMsg(message){
  return window.alert(message);
}
 
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

function checkLengthIsValid(length){
  if (length >= 8 && length <= 128){
    return true;
  }
  else{
    return false;
  }
}

function promptAndSetLowerCase(){
  var userInput = window.confirm("Do you want to include lower case characters?\n\nClick \"Ok\" for Yes.\nClick \"Cancel\" for No.");
  if (userInput){
    passwordGenerator.lowerCase = true;
  }
  else{
    passwordGenerator.lowerCase = false;
  }
}

function promptAndSetUpperCase(){
  var userInput = window.confirm("Do you want to include upper case characters?\n\nClick \"Ok\" for Yes.\nClick \"Cancel\" for No.");
  if (userInput){
    passwordGenerator.upperCase = true;
  }
  else{
    passwordGenerator.upperCase = false;
  }
}

function promptAndSetNumeric(){
  var userInput = window.confirm("Do you want to include numbers?\n\nClick \"Ok\" for Yes.\nClick \"Cancel\" for No.");
  if (userInput){
    passwordGenerator.numeric = true;
  }
  else{
    passwordGenerator.numeric = false;
  }
}

function promptAndSetSpecialChars(){
  var userInput = window.confirm("Do you want to include special characters?\n\nClick \"Ok\" for Yes.\nClick \"Cancel\" for No.");
  if (userInput){
    passwordGenerator.specialChars = true;
  }
  else{
    passwordGenerator.specialChars = false;
  }
}

function setPasswordCriteria(){
  promptAndSetLength();

  if (continueFlag){
    promptAndSetLowerCase();
    promptAndSetUpperCase();
    promptAndSetNumeric();
    promptAndSetSpecialChars();
  }
}

function generatePassword() { 
  setPasswordCriteria();
  var password = passwordGenerator.generatePassword();

  return password;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
