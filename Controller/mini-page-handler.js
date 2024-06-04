document.addEventListener('DOMContentLoaded', function () {
    const miniPageContainer = document.getElementById('mini-page-container');
    const urlParams = new URLSearchParams(window.location.search);
    let lang = urlParams.get('lang');

    document.getElementById('user-list-button').addEventListener('click', function () {
        console.log("Affichage de la liste des utilisateurs");

        let xhr = new XMLHttpRequest();
        xhr.open('POST', '../WEB/customerList.php', true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send('onlyFetch=true');
        xhr.onload = function () {
            if (this.status === 200) {
                console.log("response: ", this.responseText);
                let response = JSON.parse(this.responseText);
                let miniPageContainer = document.getElementById('mini-page-container');

                const userListContent = document.createElement('table');

                let thFirstName = document.createElement('th');
                let thSurname = document.createElement('th');
                let thEmail = document.createElement('th');
                let thPhoneNumber = document.createElement('th');
                let thAction = document.createElement('th');

                if (lang === 'fr') {
                    thFirstName.innerText = 'Prénom';
                    thSurname.innerText = 'Nom de famille';
                    thEmail.innerText = 'E-mail';
                    thPhoneNumber.innerText = 'Numéro de téléphone';
                    thAction.innerText = 'Action';
                } else if (lang === 'en') {
                    thFirstName.innerText = 'First name';
                    thSurname.innerText = 'Surname';
                    thEmail.innerText = 'E-mail';
                    thPhoneNumber.innerText = 'Phone number';
                    thAction.innerText = 'Action';
                } else if (lang === 'cnko') {
                    thFirstName.innerText = '이름';
                    thSurname.innerText = '성';
                    thEmail.innerText = '이메일';
                    thPhoneNumber.innerText = '전화번호';
                    thAction.innerText = '행동';
                }

                let tr = document.createElement('tr');
                tr.appendChild(thFirstName);
                tr.appendChild(thSurname);
                tr.appendChild(thEmail);
                tr.appendChild(thPhoneNumber);
                tr.appendChild(thAction);

                let thead = document.createElement('thead');
                thead.appendChild(tr);

                userListContent.appendChild(thead);

                miniPageContainer.innerHTML = '';

                let tBody = document.createElement('tbody');

                response.forEach(user => {
                    const tr = document.createElement('tr');

                    let tdFirstName = document.createElement('td');
                    let tdSurname = document.createElement('td');
                    let tdEmail = document.createElement('td');
                    let tdPhoneNumber = document.createElement('td');
                    let tdAction = document.createElement('td');
                    let deleteButton = document.createElement('button');

                    tdFirstName.innerText = user.firstName;
                    tdSurname.innerText = user.surname;
                    tdEmail.innerText = user.email;
                    tdPhoneNumber.innerText = user.phoneNumber;
                    deleteButton.type = 'submit';
                    deleteButton.textContent = 'Delete';
                    deleteButton.addEventListener('click', function () {
                        // Display a confirmation dialog before deleting the user
                        if (confirm('Are you sure you want to delete this user?')) {
                            let xhr = new XMLHttpRequest();
                            xhr.open('POST', '../WEB/customerList.php', true);
                            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                            xhr.onload = function () {
                                if (this.status === 200) {
                                    console.log("User deleted successfully");
                                    tr.remove();
                                } else {
                                    console.log('Error status: ' + this.status);
                                }
                            };
                            xhr.onerror = function () {
                                console.log('Request failed');
                            };
                            xhr.send('email=' + encodeURIComponent(user.email));
                        }
                    });
                    tdAction.appendChild(deleteButton);

                    tr.appendChild(tdFirstName);
                    tr.appendChild(tdSurname);
                    tr.appendChild(tdEmail);
                    tr.appendChild(tdPhoneNumber);
                    tr.appendChild(tdAction);

                    tBody.appendChild(tr);
                    tBody.style.maxWidth = '30vw';
                });

                userListContent.appendChild(tBody);
                miniPageContainer.appendChild(userListContent);
            } else {
                console.log('Error status: ' + this.status);
            }
        };
        xhr.onerror = function () {
            console.log('Request failed');
        };
    });

    document.getElementById('add-festival-button').addEventListener('click', function () {
        console.log("Affichage de l'ajout d'un festival");

        let miniPageContainer = document.getElementById('mini-page-container');
        miniPageContainer.innerHTML = '';

        const festivalForm = document.createElement('form');
        festivalForm.id = 'festival-form';
        festivalForm.enctype = 'multipart/form-data';

        let festivalNameInput = document.createElement('input');
        festivalNameInput.type = 'text';
        festivalNameInput.name = 'festivalName';
        festivalNameInput.required = true;
        festivalNameInput.id = 'festivalName';

        let beginTimeInput = document.createElement('input');
        beginTimeInput.type = 'date';
        beginTimeInput.name = 'beginTime';
        beginTimeInput.required = true;
        beginTimeInput.id = 'beginTime';

        let endTimeInput = document.createElement('input');
        endTimeInput.type = 'date';
        endTimeInput.name = 'endTime';
        endTimeInput.required = true;
        endTimeInput.id = 'endTime';

        let ticketPriceInput = document.createElement('input');
        ticketPriceInput.type = 'text';
        ticketPriceInput.name = 'ticketPrice';
        ticketPriceInput.required = true;
        ticketPriceInput.id = 'ticketPrice';

        let festivalImageInput = document.createElement('input');
        festivalImageInput.type = 'file';
        festivalImageInput.name = 'festivalImage';
        festivalImageInput.required = true;
        festivalImageInput.id = 'festivalImage';

        let submitButton = document.createElement('input');
        submitButton.type = 'submit';
        submitButton.value = 'Ajouter';
        submitButton.id = 'submit-button';

        festivalForm.appendChild(festivalNameInput);
        festivalForm.appendChild(beginTimeInput);
        festivalForm.appendChild(endTimeInput);
        festivalForm.appendChild(ticketPriceInput);
        festivalForm.appendChild(festivalImageInput);
        festivalForm.appendChild(submitButton);

        miniPageContainer.appendChild(festivalForm);

        festivalForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const data = {
                'festivalName': document.getElementById('festivalName').value,
                'beginTime': document.getElementById('beginTime').value,
                'endTime': document.getElementById('endTime').value,
                'ticketPrice': document.getElementById('ticketPrice').value,
                'festivalImage': document.getElementById('festivalImage').files[0]
            };

            console.log("data: ", data);

            let xhr = new XMLHttpRequest();
            xhr.open('POST', '../WEB/createFestival.php', true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify(data));
            xhr.onload = function () {
                if (this.status === 200) {
                    console.log("Festival created successfully");
                    document.getElementById('select-festival-button').click();
                } else {
                    console.log('Error status: ' + this.status);
                }
            };
            xhr.onerror = function () {
                console.log('Request failed');
            };

            let formData = new FormData();
            formData.append('festivalImage', document.getElementById('festivalImage').files[0]);

            let xhrFile = new XMLHttpRequest();
            xhrFile.open('POST', '../WEB/createFestival.php', true);
            xhrFile.onload = function () {
                if (this.status === 200) {
                    console.log("Festival image uploaded successfully");
                } else {
                    console.log('Error status: ' + this.status);
                }
            };
            xhrFile.onerror = function () {
                console.log('Request failed');
            };
            xhrFile.send(formData);
        });
    });

    document.getElementById('select-festival-button').addEventListener('click', function () {
        console.log("Affichage de la sélection d'un festival");

        let miniPageContainer = document.getElementById('mini-page-container');
        miniPageContainer.innerHTML = '';

        let xhr = new XMLHttpRequest();
        xhr.open('GET', '../Controller/festivalList.php', true);
        xhr.onload = function () {
            if (this.status === 200) {
                let response = JSON.parse(this.responseText);
                console.log("response: ", response);

                const festivalList = document.createElement('div');
                festivalList.id = 'festival-list';

                response.forEach(festival => {
                    let festivalItem = document.createElement('div');
                    festivalItem.style.backgroundColor = '#1d1f27';
                    festivalItem.style.color = 'white';
                    festivalItem.style.padding = '10px';
                    festivalItem.style.margin = '10px';
                    festivalItem.style.width = 'fit-content';
                    festivalItem.style.display = 'flex';
                    festivalItem.style.flexDirection = 'column';
                    festivalItem.style.alignContent = 'center';
                    festivalItem.style.justifyContent = 'center';

                    let festivalNameInd;
                    let festivalBeginTimeInd;
                    let festivalEndTimeInd;
                    let festivalTicketPriceInd;
                    let festivalImgInd;

                    festivalNameInd = document.createElement('div');
                    if (lang === 'fr') {
                        festivalNameInd = 'Nom du festival: ';
                        festivalBeginTimeInd = 'Date de début: ';
                        festivalEndTimeInd = 'Date de fin: ';
                        festivalTicketPriceInd = 'Prix du billet: ';
                        festivalImgInd = 'Image du festival: ';
                    } else if (lang === 'en') {
                        festivalNameInd = 'Festival name: ';
                        festivalBeginTimeInd = 'Begin date: ';
                        festivalEndTimeInd = 'End date: ';
                        festivalTicketPriceInd = 'Ticket price: ';
                        festivalImgInd = 'Festival image: ';
                    } else if (lang === 'cnko') {
                        festivalNameInd = '축제 이름: ';
                        festivalBeginTimeInd = '시작 날짜: ';
                        festivalEndTimeInd = '종료 날짜: ';
                        festivalTicketPriceInd = '티켓 가격: ';
                        festivalImgInd = '축제 이미지: ';
                    }

                    let festivalNameIndContainer = document.createElement('div');
                    festivalNameIndContainer.innerText = festivalNameInd;
                    festivalItem.appendChild(festivalNameIndContainer);
                    let festivalName = document.createElement('div');
                    festivalName.innerText = festival.festivalName;
                    festivalItem.appendChild(festivalName);

                    let festivalBeginTimeIndContainer = document.createElement('div');
                    festivalBeginTimeIndContainer.innerText = festivalBeginTimeInd;
                    festivalItem.appendChild(festivalBeginTimeIndContainer);
                    festivalBeginTimeIndContainer.style.whiteSpace = 'nowrap';
                    let beginTime = document.createElement('div');
                    beginTime.innerText = festival.beginTime;
                    festivalItem.appendChild(beginTime);

                    let festivalEndTimeIndContainer = document.createElement('div');
                    festivalEndTimeIndContainer.innerText = festivalEndTimeInd;
                    festivalItem.appendChild(festivalEndTimeIndContainer);
                    festivalEndTimeIndContainer.style.whiteSpace = 'nowrap';
                    let endTime = document.createElement('div');
                    endTime.innerText = festival.endTime;
                    festivalItem.appendChild(endTime);

                    let festivalTicketPriceIndContainer = document.createElement('div');
                    festivalTicketPriceIndContainer.innerText = festivalTicketPriceInd;
                    festivalItem.appendChild(festivalTicketPriceIndContainer);
                    festivalTicketPriceIndContainer.style.whiteSpace = 'nowrap';
                    let ticketPrice = document.createElement('div');
                    ticketPrice.innerText = (festival.ticketPrice + '€');
                    festivalItem.appendChild(ticketPrice);

                    let festivalImgIndContainer = document.createElement('div');
                    festivalImgIndContainer.innerText = festivalImgInd;
                    festivalItem.appendChild(festivalImgIndContainer);
                    festivalImgIndContainer.style.whiteSpace = 'nowrap';
                    let festivalImage = document.createElement('img');
                    let festivalDataItem = 'IMG-PATH'
                    festivalImage.src = festival[festivalDataItem];
                    console.log("Image path", festivalImage)
                    festivalItem.appendChild(festivalImage);


                    const editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    editButton.addEventListener('click', function () {
                        // Remove existing festival edit form if it exists
                        let existingForm = document.getElementById('festival-edit-form');
                        if (existingForm) {
                            existingForm.remove();
                        }

                        // Create a new festival edit form
                        const festivalEditForm = document.createElement('form');
                        festivalEditForm.id = 'festival-edit-form';
                        festivalEditForm.action = '../Controller/editFestival.php';
                        festivalEditForm.method = 'post';

                        let festivalIdInput = document.createElement('input');
                        festivalIdInput.type = 'hidden';
                        festivalIdInput.name = 'festivalId';

                        let festivalNameInput = document.createElement('input');
                        festivalNameInput.type = 'text';
                        festivalNameInput.name = 'festivalName';

                        let beginTimeInput = document.createElement('input');
                        beginTimeInput.type = 'date';
                        beginTimeInput.name = 'beginTime';

                        let endTimeInput = document.createElement('input');
                        endTimeInput.type = 'date';
                        endTimeInput.name = 'endTime';

                        let ticketPriceInput = document.createElement('input');
                        ticketPriceInput.type = 'text';
                        ticketPriceInput.name = 'ticketPrice';

                        let submitButton = document.createElement('input');
                        submitButton.type = 'submit';
                        submitButton.value = 'Update';

                        festivalEditForm.appendChild(festivalIdInput);
                        festivalEditForm.appendChild(festivalNameInput);
                        festivalEditForm.appendChild(beginTimeInput);
                        festivalEditForm.appendChild(endTimeInput);
                        festivalEditForm.appendChild(ticketPriceInput);
                        festivalEditForm.appendChild(submitButton);

                        festivalItem.appendChild(festivalEditForm);

                        // Fill the festival edit form with the selected festival's details
                        festivalIdInput.value = festival.festivalId;
                        festivalNameInput.value = festival.festivalName;
                        beginTimeInput.value = festival.beginTime;
                        endTimeInput.value = festival.endTime;
                        ticketPriceInput.value = festival.ticketPrice;
                    });

                    festivalItem.appendChild(editButton);
                    festivalList.appendChild(festivalItem);
                });

                miniPageContainer.appendChild(festivalList);
            } else {
                console.log('Error status: ' + this.status);
            }
        };
        xhr.onerror = function () {
            console.log('Request failed');
        };
        xhr.send();
    });
    document.getElementById('user-list-button').click();
});