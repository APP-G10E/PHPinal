document.addEventListener('DOMContentLoaded', function () {
    const rightHeaderButton1 = document.getElementById('right-header-button-1');
    rightHeaderButton1.addEventListener('click', function (){
        window.open("../WEB/paiement.php");
    })

    const rightHeaderButton = document.getElementById('right-header-button');
    rightHeaderButton.addEventListener('click', function (){
        window.open("../WEB/login.php");
    })
});