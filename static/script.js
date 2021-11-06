const clientData = JSON.parse($("#clientData").html());

$(".accordion").on("click", (event) => {
    event.target.classList.toggle('inactive');
    event.target.classList.toggle('active');
    var panel = event.target.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight+"px";
    }
});

$(".question form").on("submit", (event) => {
    let question = event.target.parentElement;
    let n = Array.from(question.parentElement.parentElement.children).indexOf(question.parentElement);
    let response = $(event.target).serializeArray();
    $(event.target).children().each((index, element) => {
        $(element.firstElementChild).prop("disabled", true);
    });
    $(event.target.lastElementChild).css("display", "none");
    // Some data is server-side
    if (n >= clientData.length) {
        fetch('serverData.json')
            .then(res => res.json())
            .then(data => {
                if (_.isEqual(data[n-clientData.length], response)) 
                    $(question.nextElementSibling).fadeIn();
                else 
                    $(question.nextElementSibling.nextElementSibling).fadeIn();
                console.log(response);
            });
    } else { // Other data is client-side
        console.log(response);
        if (_.isEqual(clientData[n], response)) {
            $(question.nextElementSibling).fadeIn();
        } else {
            $(question.nextElementSibling.nextElementSibling).fadeIn();
        }
    }
    event.preventDefault();
});