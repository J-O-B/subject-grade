// Initial Hide Questions Section
document.getElementById('questions').style.display = 'none';
document.getElementById('answerSection').style.display = 'none';

// Prevent Enter Key
let f = document.querySelector('form')
    f.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            alert('Please Only Use The Button Provided, Thank You.');
            event.preventDefault();
        }
    });

// Initialize the last node
let last = null;
// Starting Question
let question1 = 0
let qOneSub = document.getElementById('qOneSub')
qOneSub.addEventListener('click', function(event){
    event.preventDefault();
    question1 = parseInt(document.getElementById('q1').value);
    if (question1 > 0 && question1 <= 10){
        formFields(question1);
    }else{
        // Value invalid, wait for correct
    }
})
function formFields(number){
    let html = ''
    let questionBank = []
    for (i=0; i < question1; i++){
        html = `<div class="dynamicQue"><h3>Enter The Subject And Grade</h3><label for="subject${i}">Subject</label><br><input type="text" name="subject${i}"><br><br><label for="grade${i}">grade</label><br><input type="number" name="grade${i}" min="0" max="100"><br><span class="next${i+2} button" onclick="show(${i})">Next</span></div>`
        questionBank.push(html);
    }
    addToPage(questionBank);
}
// Adds the html to dom
function addToPage(data){
    let target = document.getElementById('questions');
    for (i=0; i<data.length; i++){
        target.innerHTML+= data[i];
    }
    // hide children and add slides
    subForm();
}

function subForm(){
    // Get the dom elements
    let parent = document.getElementById('questions');
    let subs = parent.getElementsByClassName('dynamicQue');
    
    // hide each child element
    for (i=1; i < subs.length; i++){
        div = subs[i];
        div.style.display = 'none';
    }
    // Now initial question, show parent
    document.getElementById('question1').style.display = 'none';
    document.getElementById('questions').style.display = 'block';

    // show first
    subs[0].style.display = 'block';
}
let answers = []

function results(){
    let container = document.getElementById('question-contain');
    container.style.display = 'none';

    let inputs = document.getElementsByTagName('input');
    
    for (i=1; i<inputs.length; i++){
        answers.push(inputs[i].value);
    }
    let placeAns = document.getElementById('answers');
    
    let gradeBook = []

    for (i=0; i < answers.length; i+=2){
        let sub = answers[i];
        let gr = answers[i+1];
        let mark = '';
        //Check the grade
        if (gr < 40){
            mark = 'F';
        }else if (gr >= 40 && gr <= 44){
            mark = 'E';
        }else if (gr >= 45 && gr <= 49){
            mark = 'D';
        }else if (gr >= 50 && gr <= 59){
            mark = 'C';
        }else if (gr >= 60 && gr <= 69){
            mark = 'B';
        }else if (gr >= 70){
            mark = 'A';
        }
        let thisData = {
            'subject': sub,
            'grade': gr,
            'mark': mark,
        };
        gradeBook.push(thisData);
    }
    // Hide Main Screen
    let mainScreen = document.getElementById('formSection');
    mainScreen.style.display = 'none';

    let answerScreen = document.getElementById('answerSection');
    answerScreen.style.display = 'block';

    // Display Results
    for (i=0; i<gradeBook.length; i++){
        let output = `<strong>Subject:</strong> <em>${gradeBook[i]['subject']}</em>,<br><strong>Score:</strong> <em>${gradeBook[i]['grade']}</em>,<br><strong>Grade of Reslut:</strong> <em><strong>${gradeBook[i]['mark']}</strong></em><br><br><hr>`;
        placeAns.innerHTML += output;
    }
    // Return Button
    placeAns.innerHTML += '<div class="center"><button type="reset" onclick="reload()">Exit</button></div>';
}

function reload(){
    location.reload();
}

function show(number){
    let parent = document.getElementById('questions');
    let subs = parent.getElementsByClassName('dynamicQue');
    if (number + 1 > subs.length - 1){
        results();
    }
    else if (number == subs.length - 1){
        subs[number].style.display = 'none';
        subs[number+1].style.display = 'block';
    }else{
        subs[number].style.display = 'none';
        subs[number+1].style.display = 'block';
    }
}