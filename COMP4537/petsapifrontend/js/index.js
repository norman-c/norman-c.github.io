// function add() {
//     let word = document.getElementById("word").value.trim();
//     let define = document.getElementById("define").value.trim();
//     if (!isLetters(word) || !isLettersAndSpace(define) || isEmpty(word) || isEmpty(define)) {
//         alert("Invalid input");
//         console.log("Invalid input");
//     } else {
//         fetch("https://powerful-hamlet-15519.herokuapp.com/api/definitions", {
//             method: "POST",
//             mode: "cors",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             redirect: "follow",
//             body: JSON.stringify({ "word": word, "define": define })
//         }).then(res => {
//             let code = res.status;
//             if (code > 199 && code < 400) {
//                 return res.json();
//             } else {
//                 return { "invalid": true };
//             }
//         }).then(data => {
//             console.log(data);
//             if (data.invalid) {
//                 alert("Failure");
//             } else {
//                 alert("Success");
//             }
//         }).catch(e => console.log(e));
//     }
// }

function createPet() {
    let name = document.getElementById("name").value.trim();
    let type = document.getElementById("type").value.trim();
    let breed = document.getElementById("breed").value.trim();
    let age = document.getElementById("age").value.trim();

    fetch(`https://petsapi4537.herokuapp.com/api/v1/pets/?name=${name}&type=${type}&breed=${breed}&age=${age}`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(res => {
        let code = res.status;
        if (code > 199 && code < 400) {
            return res.json();
        } else {
            let myString = JSON.stringify(data);
            textbox.innerHTML = myString
        }
    }).then(data => {
        let textbox = document.getElementById("textbox");
        if (data.invalid) {
            alert("Failure");
        } else {
            let myString = JSON.stringify(data);
            textbox.innerHTML = myString
        }
    }).catch(e => console.log(e));

}

function getAllPets() {
    fetch(`https://petsapi4537.herokuapp.com/api/v1/pets/`)
        .then(res => {
            let code = res.status;
            if (code > 199 && code < 400) {
                return res.json();
            } else {
                return { "invalid": true };
            }
        }).then(data => {
            let textbox = document.getElementById("textbox");
            if (data.invalid) {
                textbox.innerHTML = "Error";
            } else {
                let myString = JSON.stringify(data);
                textbox.innerHTML = myString
            }
        });
}

function getAllOwners() {
    fetch(`https://petsapi4537.herokuapp.com/api/v1/owners/`)
        .then(res => {
            let code = res.status;
            if (code > 199 && code < 400) {
                return res.json();
            } else {
                return res.json();
            }
        }).then(data => {
            let textbox = document.getElementById("textbox");
            if (data.invalid) {
                textbox.innerHTML = "Error";
            } else {
                let myString = JSON.stringify(data);
                textbox.innerHTML = myString
            }
        });
}

function getPetById() {
    let id = document.getElementById("id").value.trim();

    fetch(`https://petsapi4537.herokuapp.com/api/v1/pets/petid?petid=${id}`)
        .then(res => {
            let code = res.status;
            if (code > 199 && code < 400) {
                return res.json();
            } else {
                return res.json();
            }
        }).then(data => {
            let textbox = document.getElementById("textbox");
            if (data.invalid) {
                textbox.innerHTML = "Error";
            } else {
                let myString = JSON.stringify(data);
                textbox.innerHTML = myString
            }
        });

}

function getPetByType() {
    let type = document.getElementById("type").value.trim();

    fetch(`https://petsapi4537.herokuapp.com/api/v1/pets/pettype?type=${type}`)
        .then(res => {
            let code = res.status;
            if (code > 199 && code < 400) {
                return res.json();
            } else {
                return res.json();
            }
        }).then(data => {
            let textbox = document.getElementById("textbox");
            if (data.invalid) {
                textbox.innerHTML = "Error";
            } else {
                let myString = JSON.stringify(data);
                textbox.innerHTML = myString
            }
        });

}

function deletePetById() {
    let id = document.getElementById("iddelete").value.trim();

    fetch(`https://petsapi4537.herokuapp.com/api/v1/pets/delete?petid=${id}`, { method: 'DELETE', })
        .then(res => {
            let code = res.status;
            if (code > 199 && code < 400) {
                return res.json();
            } else {
                return res.json();
            }
        }).then(data => {
            let textbox = document.getElementById("textbox");
            if (data.invalid) {
                textbox.innerHTML = "Error";
            } else {
                let myString = JSON.stringify(data);
                textbox.innerHTML = myString
            }
        });

}