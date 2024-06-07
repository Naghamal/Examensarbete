const userData = {
    username: "user",
    password: "password"
};

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username === userData.username && password === userData.password) {
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("mainSection").style.display = "flex";
    } else {
        alert("Fel användarnamn eller lösenord!");
    }
});

document.getElementById("forgotPassword").addEventListener("click", function () {
    alert("Lösenordsåterställning är inte implementerad ännu.");
});

function logout() {
    document.getElementById("mainSection").style.display = "none";
    document.getElementById("loginSection").style.display = "flex";
}

function showQuiz() {
    document.querySelectorAll(".container").forEach(section => {
        section.style.display = "none";
    });
    document.getElementById("quizSection").style.display = "block";
    loadQuizQuestions();
}

function showTest() {
    document.querySelectorAll(".container").forEach(section => {
        section.style.display = "none";
    });
    document.getElementById("testSection").style.display = "block";
    loadTestQuestions();
}

function showResults() {
    document.querySelectorAll(".container").forEach(section => {
        section.style.display = "none";
    });
    document.getElementById("resultSection").style.display = "block";
    drawResultChart();
}

function goBack() {
    document.querySelectorAll(".container").forEach(section => {
        section.style.display = "none";
    });
    document.getElementById("mainSection").style.display = "flex";
}

function loadQuizQuestions() {
    const quizQuestions = [
        { question: "Vad är viktigt för företagskultur?", options: ["Socialt ansvarstagande", "Ekonomisk vinst", "Teknologisk innovation", "Militär precision"], correctAnswer: 0 },
        { question: "Vilken roll spelar ledare i att forma företagskulturen?", options: ["Ingen roll alls", "Minimal roll", "Stor roll", "Avgörande roll"], correctAnswer: 3 },
        { question: "Hur kan företag främja en positiv företagskultur?", options: ["Genom att erbjuda hög lön", "Genom att ha en öppen kommunikation", "Genom att ignorera sina anställda", "Genom att inte ge förmåner"], correctAnswer: 1 },
        { question: "Varför är företagskultur viktigt för anställda?", options: ["Det spelar ingen roll", "Det påverkar deras sociala liv", "Det påverkar deras mentala hälsa", "Det påverkar deras arbetsprestation"], correctAnswer: 3 },
        { question: "Hur påverkar företagskulturen företagets resultat?", options: ["Det har ingen påverkan", "Det förbättrar resultatet", "Det minskar resultatet", "Det förblir detsamma"], correctAnswer: 1 }
    ];
    const quizQuestionsContainer = document.getElementById("quizQuestions");
    quizQuestionsContainer.innerHTML = "";
    quizQuestions.forEach((questionObj, index) => {
        const questionElement = document.createElement("div");
        questionElement.innerHTML = `
            <p>${index + 1}. ${questionObj.question}</p>
            ${questionObj.options.map((option, i) => `<input type="radio" id="quizOption${index}${i}" name="quizQuestion${index}" value="${i}"><label for="quizOption${index}${i}">${option}</label><br>`).join("")}
        `;
        quizQuestionsContainer.appendChild(questionElement);
    });
}

function loadTestQuestions() {
    const testQuestions = [
        { question: "Hur ofta håller ditt företag team-building aktiviteter?", options: ["Aldrig", "En gång om året", "En gång i halvåret", "En gång i kvartalet"], correctAnswer: 2 },
        { question: "Hur värderas anställdas åsikter i ditt företag?", options: ["Ignoreras", "Beaktas ibland", "Beaktas ofta", "Alltid värderas"], correctAnswer: 3 },
        { question: "Hur transparent är ledningen i ditt företag?", options: ["Inte alls transparent", "Lite transparent", "Ganska transparent", "Fullständigt transparent"], correctAnswer: 2 },
        { question: "Hur hanterar ditt företag konflikter?", options: ["Ignorerar dem", "Hanterar dem ibland", "Hanterar dem snabbt", "Hanterar dem proaktivt"], correctAnswer: 3 },
        { question: "Hur uppmuntras innovation i ditt företag?", options: ["Inte alls", "Lite", "Ganska mycket", "Mycket"], correctAnswer: 2 }
    ];
    const testQuestionsContainer = document.getElementById("testQuestions");
    testQuestionsContainer.innerHTML = "";
    testQuestions.forEach((questionObj, index) => {
        const questionElement = document.createElement("div");
        questionElement.innerHTML = `
            <p>${index + 1}. ${questionObj.question}</p>
            ${questionObj.options.map((option, i) => `<input type="radio" id="testOption${index}${i}" name="testQuestion${index}" value="${i}"><label for="testOption${index}${i}">${option}</label><br>`).join("")}
        `;
        testQuestionsContainer.appendChild(questionElement);
    });
}

function submitQuiz() {
    const quizResults = [];
    const quizQuestions = document.querySelectorAll("#quizQuestions div");
    quizQuestions.forEach((questionDiv, index) => {
        const selectedOption = document.querySelector(`input[name="quizQuestion${index}"]:checked`);
        quizResults.push(selectedOption ? parseInt(selectedOption.value) : null);
    });
    localStorage.setItem('quizResults', JSON.stringify(quizResults));
    alert("Quizet har skickats in!");
    showResults();
}

function submitTest() {
    const testResults = [];
    const testQuestions = document.querySelectorAll("#testQuestions div");
    testQuestions.forEach((questionDiv, index) => {
        const selectedOption = document.querySelector(`input[name="testQuestion${index}"]:checked`);
        testResults.push(selectedOption ? parseInt(selectedOption.value) : null);
    });
    localStorage.setItem('testResults', JSON.stringify(testResults));
    alert("Testet har skickats in!");
    showResults();
}

function drawResultChart() {
    const quizResults = JSON.parse(localStorage.getItem('quizResults')) || [];
    const testResults = JSON.parse(localStorage.getItem('testResults')) || [];

    const ctx = document.getElementById('resultChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Fråga 1', 'Fråga 2', 'Fråga 3', 'Fråga 4', 'Fråga 5', 'Fråga 6'],
            datasets: [
                {
                    label: 'Quizresultat',
                    data: quizResults,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Testresultat',
                    data: testResults,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
