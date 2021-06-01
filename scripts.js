chequeApp = {};

chequeApp.init = () => {

    // Storing number words in arrays for quick access
    chequeApp.smallDigits = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    chequeApp.tyDigits = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    chequeApp.bigDigits = ['hundred', 'thousand', 'million', 'billion', 'trillion'];

    // Storing some elements in variables for quick access
    chequeApp.form = document.querySelector('form');
    chequeApp.submit = document.querySelector('button');
    chequeApp.numberText = document.querySelector('.convertedNum p');

    // Reset input form on page refresh/load
    chequeApp.form.reset();

    // 
    chequeApp.submit.addEventListener('click', (e) => {
        e.preventDefault();
        chequeApp.input = document.getElementById('numberInput').value;
        chequeApp.numConverter();
    });
};

// Able to convert 999,999,999,999,999
chequeApp.numConverter = () => {
    
    // Determine how many digits the number is made up of
    const numAmount = chequeApp.input.length;
    console.log(numAmount);

    // Some basic error handlings
    if (chequeApp.input < 0) return chequeApp.numberText.textContent = 'Negative numbers are not supported.';
    if (numAmount > 15) return chequeApp.numberText.textContent = 'Number is too large! Please try again with a number container no more than 15 digits.';

    // Store each digit of the number into an array
    // The index number of the array will help get the correct word from the number arrays
    const storeInArray = Array.from(chequeApp.input);
    console.log(storeInArray);
    
    // When input number is below 100
    const convertSmall = (number) => {
        if (storeInArray[storeInArray.length - 2] == 0 && storeInArray[storeInArray.length - 1] != 0) return chequeApp.numberText.textContent = chequeApp.smallDigits[storeInArray[storeInArray.length - 1]];
        if (number < 20) return chequeApp.numberText.textContent = chequeApp.smallDigits[number];
        if (storeInArray[storeInArray.length - 2] > 1 && storeInArray[storeInArray.length - 1] == 0) return chequeApp.numberText.textContent = chequeApp.tyDigits[storeInArray[storeInArray.length - 2]];
        if (number < 100) return chequeApp.numberText.textContent = `${chequeApp.tyDigits[storeInArray[storeInArray.length - 2]]}-${chequeApp.smallDigits[storeInArray[storeInArray.length - 1]]}`;
    };
    convertSmall(chequeApp.input);

    // When input number is in the hundreds
    if (numAmount === 3) {
        const bundle = storeInArray[1] + storeInArray[2];
        const hundredNum = `${chequeApp.smallDigits[storeInArray[0]]} ${chequeApp.bigDigits[0]}`;

        if (bundle == 0) {
            return chequeApp.numberText.textContent = hundredNum;
        } else {
            return chequeApp.numberText.textContent = hundredNum + ' ' + convertSmall(bundle);
        };
    };

    // When the input number is in the thousands
    if (numAmount === 4) {
        const smallBundle = storeInArray[storeInArray.length - 2] + storeInArray[storeInArray.length - 1];
        const smallHundredNum = `${chequeApp.smallDigits[storeInArray[storeInArray.length - 3]]} ${chequeApp.bigDigits[0]}`;
        const thousandNum = `${chequeApp.smallDigits[storeInArray[0]]} ${chequeApp.bigDigits[1]}`;

        if (smallBundle == 0) {
            return chequeApp.numberText.textContent = thousandNum;
        } else if (storeInArray[storeInArray.length - 3] == 0) {
            return chequeApp.numberText.textContent = thousandNum + ' ' + convertSmall(smallBundle);
        } else {
            return chequeApp.numberText.textContent = thousandNum + ' ' + smallHundredNum + ' ' + convertSmall(smallBundle);
        };
    };

    if (numAmount === 6) {
        const largeBundle = storeInArray[storeInArray.length - 5] + storeInArray[storeInArray.length - 4];
        const largeHundredNum = `${chequeApp.smallDigits[storeInArray[0]]} ${chequeApp.bigDigits[0]}`;
        if (largeBundle == 0) {
            return chequeApp.numberText.textContent = largeHundredNum + ' ' + chequeApp.bigDigits[1];
        } else {
            return chequeApp.numberText.textContent = largeHundredNum + ' ' + convertSmall(largeBundle) + ' ' + chequeApp.bigDigits[1];
        }
    }
};

chequeApp.init();