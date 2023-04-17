const check_URL = './images/checked.png';
const uncheck_URL = './images/unchecked.png';



function restart () {
    const risultato = document.querySelector ('#risultato');
    risultato.innerHTML= '';
    selectedAnswers = {};
    for (const container of containers){
       
        container.classList.remove ('selected');
        container.classList.remove ('unselected');
        const deselect = container.querySelector('img.checkbox');
        deselect.src = uncheck_URL; 
        container.addEventListener ('click', change);
    }

}

function showResult (title,content) {
    
    const titolo = document.createElement ('h1');
    titolo.textContent = title;
    const contenuto = document.createElement ('p');
    contenuto.textContent = content;
    const resetbtn = document.createElement ('button');
    resetbtn.textContent = 'Ricomincia il quiz';
    const risultato = document.querySelector ('#risultato');
    risultato.appendChild (titolo);
    risultato.appendChild (contenuto);
    risultato.appendChild (resetbtn);
    resetbtn.addEventListener ('click', restart);
}

function getResult(){
    const one = selectedAnswers['one'];
    const two = selectedAnswers['two'];
    const three = selectedAnswers['three'];
    let title;
    let content;
    if (one === two || one === three || one !== two && two !== three ){
        title = RESULTS_MAP[one] ['title'];
        content = RESULTS_MAP[one] ['contents'];
    } 
    else {
        title = RESULTS_MAP[two] ['title'];
        content = RESULTS_MAP[two] ['contents'];
    }
   showResult (title, content);

}

function addToMap (questionId,answerId){
    selectedAnswers [questionId] = answerId;
    if (Object.keys(selectedAnswers).length === 3){
        
        for (const container of containers) {
            container.removeEventListener('click', change);
        }
        getResult();
    }
    
}

function change (event)

{
    const select = event.currentTarget;
    const checkbox = select.querySelector('img.checkbox');
    const answerId = select.dataset.choiceId;
    const questionId = select.dataset.questionId;
    for (const container of containers)
    {

     if (answerId !== container.dataset.choiceId && questionId === container.dataset.questionId){
        container.classList.remove('selected');
        container.classList.add('unselected');
        const deselect = container.querySelector('img.checkbox');
        deselect.src = uncheck_URL;
    } 

     else {
        
        select.classList.add ('selected');
        select.classList.remove('unselected');
        checkbox.src = check_URL;  
     }
     
    }
 addToMap (questionId,answerId);
}

const containers = document.querySelectorAll ('.choice-grid div');
for (const container of containers){
    container.addEventListener ('click', change);

}

let selectedAnswers = {};