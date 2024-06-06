document.getElementById('organiserForm').addEventListener('submit', function (event) {
    const firstName = document.getElementById('firstName').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const confirmEmail = document.getElementById('confirmEmail').value;
    const errorMessage = document.getElementById('error-message');

    const namePattern = /^[A-Za-z]+$/;
    if (!namePattern.test(firstName)) {
        if (lang === 'fr') {
            errorMessage.textContent = 'Le prénom ne doit contenir que des lettres.';
        } else if (lang === 'en') {
            errorMessage.textContent = 'First name must contain only letters.';
        } else if (lang === cnko) {
            errorMessage.textContent = '이름은 문자 만 포함해야합니다.';
        }
        errorMessage.style.color = 'red';
        event.preventDefault();
        return;
    }
    if (!namePattern.test(surname)) {
        if (lang === 'fr') {
            errorMessage.textContent = 'Le nom de famille ne doit contenir que des lettres.';
        } else if (lang === 'en') {
            errorMessage.textContent = 'Surname must contain only letters.';
        } else if (lang === cnko) {
            errorMessage.textContent = '성은 문자 만 포함해야합니다.';
        }
        errorMessage.style.color = 'red';
        event.preventDefault();
        return;
    }

    if (email !== confirmEmail) {
        if (lang === 'fr') {
            errorMessage.textContent = 'Les adresses e-mail ne correspondent pas.';
        } else if (lang === 'en') {
            errorMessage.textContent = 'Email addresses do not match.';
        } else if (lang === cnko) {
            errorMessage.textContent = '이메일 주소가 일치하지 않습니다.';
        }
        errorMessage.style.color = 'red';
        event.preventDefault();
    }
});