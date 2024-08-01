/*dados iniciais */
//variávél para armazenar a questão atual
let currentQuestion = 0;

//variável que vai guardar quantoas questões acertei
let correctAnswers = 0;

showQuestion();

//evento do botão de reset
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);


/*Funções */
//função para mostrar a questão
function showQuestion() {
    //condição para mostrar aquestão
    if(questions[currentQuestion]) {
        //variável que vai armazenar a questão por que ela vai se repetir várias vezes
        let q = questions[currentQuestion];

        //variuavel que vai guardar as porcentagens das questões acertadas
        let pct = Math.floor((currentQuestion / questions.length) * 100);
        //fuunção que vai mostrar a area junto com a porcentagem
        document.querySelector('.progress--bar').style.width = `${pct}%`;

        //função para mostrar a área da questão
        document.querySelector('.scoreArea').style.display= 'none';
        document.querySelector('.questionArea').style.display= 'block';

        //para mostra a questão dentro do html
        document.querySelector('.question').innerHTML = q.question;

        //função para mostar as opções
        //document.querySelector('options').innerHTML = '';

        //loop para mostrar as opções
        let optionsHtml = '';
        for (let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option">
                <span>${parseInt(i) + 1}</span> ${q.options[i]}
            </div>`;
            
        }
            /*Segunda opção 
            for (let i in q.options) {
                document.querySelector('.option').innerHTML += `<div>${q.options[i]}</div>`;
            }*/
       //fução para jogar as opções na tela
       document.querySelector('.options').innerHTML = optionsHtml;

       //função para criar um evento de click na opção
       document.querySelectorAll('.options .option').forEach(item => {
        item.addEventListener('click', optionClickEvent);
       });

    } else {
        //acabr as questões
        finishQuiz();
    } 
}

//função de clicar nas opções
function optionClickEvent(e) {
    //variável parapara ter acesso a opãp que foi clicado
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    //consdição para saber se acertou
    if(questions[currentQuestion].answer === clickedOption) {
        //fubnção para adicionar todas as respostas certas
        correctAnswers ++;
    }
    //função para passar para a próxima pergunta
    currentQuestion ++;
    showQuestion();
}

//função que vai finalizar a barrinha de progresso
function finishQuiz() {
    //função que vai mostrar quantos % de acertos
    let points =  Math.floor((correctAnswers / questions.length) * 100 );

    //condição para saber quantas acertou ou não para mudar os Parabéns
    if(points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Ta ruin hem!';
        document.querySelector('.scorePct').style.color = '#f00';
    }else if(points => 30 && points <70) {
        document.querySelector('.scoreText1').innerHTML = 'Muiuto bonm!';
        document.querySelector('.scorePct').style.color = '#ff0';
    }else if(points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!';
        document.querySelector('.scorePct').style.color = '#0d630d';
    }

    //função que vai alterar o texto do html
    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;

    //função que vai mostrar quantas perguntas acertou e não
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length}
        e acertou ${correctAnswers} questões`;

    //função para escoder a área da questão
    document.querySelector('.scoreArea').style.display= 'block';
    document.querySelector('.questionArea').style.display= 'none';

    //fuunção que vai a porcentagem no final
    document.querySelector('.progress--bar').style.width = '100%';
}

//Função que vai resetar o quiz
function resetEvent() {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}