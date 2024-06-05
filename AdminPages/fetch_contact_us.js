window.addEventListener('DOMContentLoaded', (event) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'fetch_contact_us.php', true);
    xhr.onload = function () {
        if (this.status === 200) {
            let data = JSON.parse(this.responseText);
            let table = document.createElement('table');
            let thead = document.createElement('thead');
            let tbody = document.createElement('tbody');

            let headers = ['Prénom', 'Nom', 'E-mail', 'Message'];
            let tr = document.createElement('tr');
            headers.forEach(function (header) {
                let th = document.createElement('th');
                th.textContent = header;
                tr.appendChild(th);
            });
            thead.appendChild(tr);

            data.forEach(function (row) {
                let tr = document.createElement('tr');
                Object.values(row).forEach(function (text) {
                    let td = document.createElement('td');
                    td.textContent = text;
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });

            table.appendChild(thead);
            table.appendChild(tbody);
            document.querySelector('#contacts-container').appendChild(table);
        }
    }
    xhr.send();
});