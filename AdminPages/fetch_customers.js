document.querySelector('#search-button').addEventListener('click', function () {
    const data = {
        'first_name': document.getElementById('first-name-input').value,
        'surname': document.getElementById('surname-input').value,
        'email': document.getElementById('email-input').value,
        'phone_number': document.getElementById('phone-number-input').value,
        'verified': document.getElementById('verified-select').value
    };

    if (data.verified === "x") {
        return;
    }

    console.log("data: ", data);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '../AdminPages/fetch_customers.php', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(data));
    xhr.onload = function () {
        if (this.status === 200) {
            console.log("response: ", this.responseText);
            let response = JSON.parse(this.responseText);
            let tbody = document.getElementById('tbody');

            tbody.innerHTML = '';

            const legend = document.createElement('tr');

            let thEmail = document.createElement('th');
            let thSurname = document.createElement('th');
            let thFirstName = document.createElement('th');
            let thPhoneNumber = document.createElement('th');
            let thVerified = document.createElement('th');

            thEmail.innerText = 'E-mail';
            thSurname.innerText = 'Nom de famille';
            thFirstName.innerText = 'Prénom';
            thPhoneNumber.innerText = 'Numéro de téléphone';
            thVerified.innerText = 'Verifié';

            legend.appendChild(thEmail);
            legend.appendChild(thSurname);
            legend.appendChild(thFirstName);
            legend.appendChild(thPhoneNumber);
            legend.appendChild(thVerified);

            tbody.appendChild(legend);

            let addedCustomers = [];

            response.forEach(customer => {
                if (!addedCustomers.includes(customer.email)) {
                    addedCustomers.push(customer.email);

                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                <td>${customer.email}</td>
                <td>${customer.surname}</td>
                <td>${customer.firstName}</td>
                <td>${customer.phoneNumber}</td>
                <td>${customer.verified}</td>
            `;
                    tbody.appendChild(tr);
                }
            });
            console.log('Response from server: ', this.responseText);
        } else {
            console.log('Error status: ' + this.status);
        }
    };
    xhr.onerror = function () {
        console.log('Request failed');
    };
});