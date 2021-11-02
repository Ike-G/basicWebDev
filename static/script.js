const clientData = JSON.parse($("#clientData").html());

$(".question form").on("submit", (event) => {
    let question = event.target.parentElement;
    let n = Array.from(question.parentElement.children).indexOf(question);
    let response = $(event.target).serializeArray();
    console.log(response);
    let answer;
    // Some data is server-side
    if (n >= clientData.length) {
        fetch('serverData.json').then((res) => {
            res.json().then((data) => {
                answer = data[n-clientData.length];
            });
        });
    } else { // Other data is client-side
        answer = clientData[n];
    }
    if (response == answer) {
        $(question.nextElementSibling).css("display", "block");
    } else {
        $(question.nextElementSibling.nextElementSibling).css("display", "block");
    }

    event.preventDefault();
});