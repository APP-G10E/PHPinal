document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner le bouton envoyer
    const submitButton = document.getElementById('login');

    // Ajouter un écouteur d'événement pour le clic sur le bouton envoyer
    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); // Empêcher le rechargement de la page

        // Récupérer les valeurs des champs du formulaire
        const userName = document.getElementById('user_name').value;
        const userFname = document.getElementById('user_Fname').value;
        const userEmail = document.getElementById('user_email').value;
        const demande = document.getElementById('demande').value;

        // Créer un objet FormData pour envoyer les données via AJAX
        const formData = new FormData();
        formData.append('user_name', userName);
        formData.append('user_Fname', userFname);
        formData.append('user_email', userEmail);
        formData.append('demande', demande);

        // Envoyer les données via AJAX
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'process_form.php', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Gérer la réponse du serveur
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
