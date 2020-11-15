function isLetters(s) {
    return s.match("^[a-zA-Z\(\)]+$");
}

function isLettersAndSpace(s) {
    return s.match("^[a-zA-Z ]+$");
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function add() {
    let word = document.getElementById("word").value.trim();
    let define = document.getElementById("define").value.trim();
    if (!isLetters(word) || !isLettersAndSpace(define) || isEmpty(word) || isEmpty(define)) {
        alert("Invalid input");
        console.log("Invalid input");
    } else {
        fetch("https://powerful-hamlet-15519.herokuapp.com/api/definitions", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            body: JSON.stringify({ "word": word, "define": define })
        }).then(res => {
            let code = res.status;
            if (code > 199 && code < 400) {
                return res.json();
            } else {
                return { "invalid": true };
            }
        }).then(data => {
            console.log(data);
            if (data.invalid) {
                alert("Failure");
            } else {
                alert("Success");
            }
        }).catch(e => console.log(e));
    }
}

function find() {
    wDisplay.innerHTML = "";
    dDisplay.innerHTML = "";
    let word = document.getElementById("word").value.trim();
    if (isEmpty(word) || !isLetters(word)) {
        alert("Invalid input");
        console.log("Invalid input");
    } else {
        fetch(`https://powerful-hamlet-15519.herokuapp.com/api/definitions?word=${word}`)
            .then(res => {
                let code = res.status;
                if (code > 199 && code < 400) {
                    return res.json();
                } else {
                    return { "invalid": true };
                }
            }).then(data => {
                let wDisplay = document.getElementById("wDisplay");
                let dDisplay = document.getElementById("dDisplay");
                if (data.invalid) {
                    wDisplay.innerHTML = "Error";
                } else {
                    wDisplay.innerHTML = word;
                    dDisplay.innerHTML = data.definition;
                }
            });
    }
}