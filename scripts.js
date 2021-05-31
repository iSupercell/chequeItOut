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
        console.log(chequeApp.input);
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
    
    // When input number is between 20 and 99
    if (chequeApp.input < 20) return chequeApp.numberText.textContent = chequeApp.smallDigits[chequeApp.input];
    if (chequeApp.input >= 20 && chequeApp.input < 100) return chequeApp.numberText.textContent = `${chequeApp.tyDigits[storeInArray[0]]}-${chequeApp.smallDigits[storeInArray[1]]}`;

    // When input number is in the hundreds
    const hundred = () => {
        if (numAmount === 3) {
            const getIndex = storeInArray[0];
            const hundredNum = `${chequeApp.smallDigits[getIndex]} ${chequeApp.bigDigits[0]}`;
            if (storeInArray[1] == 1) {
                return chequeApp.numberText.textContent = `${hundredNum} ${chequeApp.smallDigits[chequeApp.input]}`;
            } else {
                const middleNum = chequeApp.tyDigits[storeInArray[1]];
                return chequeApp.numberText.textContent = `${hundredNum} ${middleNum}-${chequeApp.smallDigits[storeInArray[2]]}`
            };
        };
    }
    hundred();

    // When the input number is in the thousands
    // if (numAmount === 4)
};

chequeApp.init();