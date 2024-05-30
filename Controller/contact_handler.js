document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('footerSend');
    console.log("salut");

    submitButton.addEventListener('click', function (event) {

        const userName = document.getElementById('user_name').value;
        const userFname = document.getElementById('user_Fname').value;
        const userEmail = document.getElementById('user_email').value;
        const demande = document.getElementById('demande').value;

        const formData = new FormData();
        formData.append('user_name', userName);
        formData.append('user_Fname', userFname);
        formData.append('user_email', userEmail);
        formData.append('demande', demande);
        console.log("Informations récupérées: ", formData)

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '../Controller/process_form.php', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    alert('Formulaire envoyé avec succès !');
                } else {
                    alert('Erreur lors de l\'envoi du formulaire. Veuillez réessayer.');
                }
            }
        };
        xhr.send(formData);
    });
});
