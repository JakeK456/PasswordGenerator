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

var password = {
  length: 128,
  lowerCase: true,
  upperCase: true,
  numeric: true,
  specialChars: true,

  generatePassword(){
    var passcode = "";
    var functionList = this.generateFunctionList()

    if (functionList.length === 0){
      return "Criteria Excludes Everything!";
    }

    for (var i = 0; i <= this.length; i++){
      passcode += this.charAccordingToCriteria(functionList);
    }
    return passcode;
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

// Assignment Code
var generateBtn = document.querySelector("#generate");

function displayErrorMsg(message){
  return window.alert(message);
}

function promptUserForPasswordLength(){
  var userInput = window.prompt("How many characters would you like the password to be?\nEnter a number between 8 and 128:");
  return userInput;
}

function checkLengthIsValid(length){
  if (length >= 8 && length <= 128){
    return true;
  }
  else{
    return false;
  }
}

function promptUserAndCheckPasswordLength(){
  var userInput = promptForLength();
  var lengthIsValid = checkLengthIsValid(userInput);

  if (lengthIsValid){
    return userInput;
  }
  else{
    displayErrorMsg("Length Invalid.\nMake sure to enter a number between 8 and 128.\nTry Again.");
  }
}

function populatePasswordCriteria(){
  promptUserForLength();
  promptUserForLowerCase();
  promptUserForUpperCase();


}

function generatePassword() {
  var password = "password";

  promptUserForCriteria();


  var passwordLength = promptUserAndCheckPasswordLength();
  
  console.log(passwordLength);

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
