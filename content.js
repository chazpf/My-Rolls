const getMyRolls = () => {
    let collection = Array.from(document.getElementsByClassName('you'));
    let myRolls = [];
    for (i = 0; i < collection.length; i++) {
        let inline = collection[i].getElementsByClassName('inlinerollresult');
        for (j = 0; j < inline.length; j++) {
            if (inline[j].getAttribute('original-title')) {
                let span = inline[j].getAttribute('original-title');
                if (span.includes('Rolling 1d20')) {
                    let roll = span.match(/>(\d\d|\d)</);
                    let rollTrimmed = roll[0].match(/\d\d|\d/);
                    rollTrimmed = rollTrimmed[0];
                    myRolls.push(rollTrimmed);
                }
            } else if (inline[j].getAttribute('title')) {
                let span = inline[j].getAttribute('title');
                if (span.includes('Rolling 1d20')) {
                    let roll = span.match(/>(\d\d|\d)</);
                    let rollTrimmed = roll[0].match(/\d\d|\d/);
                    rollTrimmed = rollTrimmed[0];
                    myRolls.push(rollTrimmed);
                }
            }
        }
    }
    myRolls = myRolls.map((i) => Number(i)); // convert array from strings to numbers

    return myRolls;
};

const getMyName = () => {
    let collection = Array.from(document.getElementsByClassName('you'));
    for (i = 0; i < collection.length; i++) {
        let checkName = collection[i].getElementsByClassName('by');
        if (checkName) {
            rawName = checkName[0].innerHTML;
            console.log(rawName);
            fixedName = rawName.slice(0, rawName.length - 1);
            return fixedName;
        }
    }

    return 'My Rolls';
};

const getMyAverage = () => {
    let myRolls = getMyRolls();

    let total = 0;
    for (i = 0; i < myRolls.length; i++) {
        total += myRolls[i];
    }
    let avgLong = total / myRolls.length;
    let avg = avgLong.toFixed(2);

    return avg;
};

const getMyCommon = () => {
    let myRolls = getMyRolls();

    let counts = {};
    let compare = 0;
    let mostCommon;
    // finds most common element of array, only 1 if tied
    for (i = 0; i < myRolls.length; i++) {
        let j = myRolls[i];

        if (counts[j] === undefined) {
            counts[j] = 1;
        } else {
            counts[j] = counts[j] + 1;
        }
        if (counts[j] > compare) {
            compare = counts[j];
            mostCommon = myRolls[i];
        }
    }

    return mostCommon;
};

const alertAverageAndCommon = () => {
    let myName = getMyName();
    let myRolls = getMyRolls();
    let myAverage = getMyAverage();
    let myCommon = getMyCommon();
    console.log('myRolls = ' + myRolls);
    console.log('myAverage = ' + myAverage);
    console.log('myCommon = ' + myCommon);
    if (myRolls.length > 0) {
        alert(
            `${myName}
Your average out of ${myRolls.length} d20 rolls has been ${myAverage}.
Your most commonly rolled number has been: ${myCommon}.`
        );
    } else if (myRolls.length == 0) {
        alert(`I can't find any rolls of yours on this page!`);
    } else {
        alert(`Something's gone terribly wrong!`);
    }
};

chrome.runtime.onMessage.addListener((message) => {
    if (message == 'rolls') {
        alertAverageAndCommon();
    }
});
