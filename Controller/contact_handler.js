window.setupContactForm = function () {
    const submitButton = document.getElementById('submit-button');
    if (submitButton) {
        submitButton.addEventListener('click', function (event) {
            event.preventDefault();

            const userName = document.getElementById('user_name').value;
            const userFname = document.getElementById('user_Fname').value;
            const userEmail = document.getElementById('user_email').value;
            const demande = document.getElementById('demande').value;

            let formData = new FormData();
            formData.append('user_name', userName);
            formData.append('user_Fname', userFname);
            formData.append('user_email', userEmail);
            formData.append('demande', demande);

            fetch('../Controller/process_form.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log("Formulaire envoyé avec succès");
                    } else {
                        console.log("Erreur lors de l\'envoi du formulaire. Veuillez réessayer.");
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        });
    }
}

document.addEventListener('DOMContentLoaded', setupContactForm);