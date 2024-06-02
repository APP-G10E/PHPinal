window.setupContactForm = function () {
    const submitButton = document.getElementById('submit-button');
    if (submitButton) {
        submitButton.addEventListener('click', function (event) {
            event.preventDefault();

            const userName = document.getElementById('user_name').value;
            const userFname = document.getElementById('user_Fname').value;
            const userEmail = document.getElementById('user_email').value;
            const demande = document.getElementById('demande').value;

            const data = {
                user_name: userName,
                user_Fname: userFname,
                user_email: userEmail,
                demande: demande
            };
            console.log("Contenu du contact: ", data)

            fetch('../Controller/process_form.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Formulaire envoyé avec succès !');
                    } else {
                        alert('Erreur lors de l\'envoi du formulaire. Veuillez réessayer.');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        });
    }
}

document.addEventListener('DOMContentLoaded', setupContactForm);