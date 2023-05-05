
const form = document.querySelector('form');
const wordInput = document.querySelector('#word');
const synonymInput = document.querySelector('#synonym');
const meaningInput = document.querySelector('#meaning');
const exampleInput = document.querySelector('#example');
const flashcard = document.querySelector('.flashcard');

let words = JSON.parse(localStorage.getItem('words')) ?? {
    "A": [],
    "B": [],
    "C": [],
    "D": [],
    "E": [],
    "F": [],
    "G": [],
    "H": [],
    "J": [],
    "K": [],
    "L": [],
    "M": [],
    "N": [],
    "O": [],
    "P": [],
    "Q": [],
    "R": [],
    "S": [],
    "T": [],
    "U": [],
    "V": [],
    "W": [],
    "X": [],
    "Y": [],
    "Z": [],
};

let letter;

function updateLetter(value) {

    letter = String.fromCharCode(64 + parseInt(value));
    document.querySelector('.value').textContent = letter;

    renderflashcard();
}


function renderflashcard() {

    document.querySelector(".flashcards-container").innerHTML = "";

    Object.keys(words).find(function (obj) {

        if (letter === obj) {

            let arr = words[obj];

            if ((arr.length)=== 0) {

                document.querySelector(".flashcards-container").innerHTML = `<h1>No words starts with this Alphabet</h1>`

            }

            else {

                arr.forEach((item, index) => {

                    let card = document.createElement('div');
                    card.classList.add('flashcard');

                    let flashcard_inner = document.createElement("div");
                    flashcard_inner.setAttribute("class", "flashcard__inner");
                    card.appendChild(flashcard_inner);

                    let flashcard_face_one = document.createElement("div");
                    flashcard_face_one.setAttribute("class", "flashcard__face flashcard__face--front");
                    flashcard_inner.appendChild(flashcard_face_one);

                    let front_top = document.createElement("div");
                    front_top.setAttribute("class", "front-top");
                    front_top.innerHTML = `${item.word}`;
                    flashcard_face_one.appendChild(front_top);

                    let front_bottom = document.createElement("div");
                    front_bottom.setAttribute("class", "front-bottom");
                    front_bottom.innerHTML = `${item.synonym}`;
                    flashcard_face_one.appendChild(front_bottom);

                    let flashcard_face_two = document.createElement("div");
                    flashcard_face_two.setAttribute("class", "flashcard__face flashcard__face--back");
                    flashcard_inner.appendChild(flashcard_face_two);

                    let back_top = document.createElement("div");
                    back_top.setAttribute("class", "back-top");
                    back_top.innerHTML = `${item.meaning}`;
                    flashcard_face_two.appendChild(back_top);

                    let back_bottom = document.createElement("div");
                    back_bottom.setAttribute("class", "back-bottom");
                    back_bottom.innerHTML = `${item.example}`;
                    flashcard_face_two.appendChild(back_bottom);

                    let flashcard_buttons = document.createElement("div");
                    flashcard_buttons.setAttribute("class", "flashcard__buttons");
                    card.appendChild(flashcard_buttons);

                    let edit_btn = document.createElement("button");
                    edit_btn.setAttribute("class", "flashcard__edit-button");
                    edit_btn.innerText = "Edit";
                    edit_btn.setAttribute("onclick", `editFlashcard(${index})`);
                    flashcard_buttons.appendChild(edit_btn);

                    let delete_btn = document.createElement("button");
                    delete_btn.setAttribute("class", "flashcard__delete-button");
                    delete_btn.innerText = "Delete";
                    delete_btn.setAttribute("onclick", `deleteFlashcard(${index})`);
                    flashcard_buttons.appendChild(delete_btn);

                    document.querySelector(".flashcards-container").append(card);


                    flashcard_inner.addEventListener('click', function () {
                        card.classList.toggle('is-flipped');
                    });

                });
            }



        }
    });

}


flashcard.addEventListener('click', function () {
    flashcard.classList.toggle('is-flipped');
});



function addFlashcard(event) {

    event.preventDefault();

    const word = wordInput.value;
    const synonym = synonymInput.value;
    const meaning = meaningInput.value;
    const example = exampleInput.value;
    if (word && synonym && meaning && example) {
        const firstLetter = word.charAt(0).toUpperCase();
        const flashcard = { word, synonym, meaning, example };
        words[firstLetter].push(flashcard);
        localStorage.setItem('words', JSON.stringify(words));
        alert(`Word "${word}" added successfully!`);
        form.reset();
    }


}

form.addEventListener('submit', addFlashcard);

function deleteFlashcard(index) {

    if (confirm('Are you sure you want to delete this flashcard?')) {

        words[letter].splice(index, 1);
        localStorage.setItem('words', JSON.stringify(words));
        renderflashcard();
    }
}



function editFlashcard(index) {

    const flashcard = words[letter][index];
    const frontText = prompt('Enter the front text:', flashcard.word);
    const backText = prompt('Enter the back text:', flashcard.synonym);
    const meaningText = prompt('Enter the meaning text:', flashcard.meaning);
    const exampleText = prompt('Enter the example text:', flashcard.example);

    let firstLetter = frontText.charAt(0).toUpperCase();

    if (firstLetter === letter) {

        let updatedFlashcard = {
            word: frontText,
            synonym: backText,
            meaning: meaningText,
            example: exampleText,
        };

        words[letter][index] = updatedFlashcard;
        localStorage.setItem('words', JSON.stringify(words));
        renderflashcard();

    }


    else {
        alert(`The word "${frontText}" should start with "${letter}"`);
    }

}
