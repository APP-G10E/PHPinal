document.querySelector('#search-button').addEventListener('click', function () {
    const data = {
        'first_name': document.getElementById('first-name-input').value,
        'surname': document.getElementById('surname-input').value,
        'email': document.getElementById('email-input').value,
        'phone_number': document.getElementById('phone-number-input').value,
        'verified': document.getElementById('verified-select').value
    };

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

            response.forEach(customer => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                <td>${customer.email}</td>
                <td>${customer.surname}</td>
                <td>${customer.firstName}</td>
                <td>${customer.phoneNumber}</td>
                <td>${customer.verified}</td>
            `;
                tbody.appendChild(tr);
            });
            console.log('Response from server: ', this.responseText);
        } else {
            console.log('Error status: ' + this.status);
        }
    };
    xhr.onerror = function () {
        console.log('Request failed');
    };
    let dataString = Object.keys(data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');
    xhr.send(dataString);
});