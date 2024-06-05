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

        document.getElementById('mini-page-container').style.justifyContent = 'center';

        let miniPageContainer = document.getElementById('mini-page-container');
        miniPageContainer.innerHTML = '';

        const festivalForm = document.createElement('form');
        festivalForm.id = 'festival-form';
        festivalForm.enctype = 'multipart/form-data';

        const labels = {
            'en': {
                'festivalName': 'Festival Name',
                'beginTime': 'Begin Time',
                'endTime': 'End Time',
                'ticketPrice': 'Ticket Price',
                'festivalImage': 'Festival Image'
            },
            'fr': {
                'festivalName': 'Nom du Festival',
                'beginTime': 'Date de Début',
                'endTime': 'Date de Fin',
                'ticketPrice': 'Prix du Billet',
                'festivalImage': 'Image du Festival'
            },
            'cnko': {
                'festivalName': '축제 이름',
                'beginTime': '시작 날짜',
                'endTime': '종료 날짜',
                'ticketPrice': '티켓 가격',
                'festivalImage': '축제 이미지'
            }
        };

        const fields = [
            {
                type: 'text',
                name: 'festivalName',
                required: true,
                id: 'festivalName',
                label: labels[lang]['festivalName']
            },
            {type: 'date', name: 'beginTime', required: true, id: 'beginTime', label: labels[lang]['beginTime']},
            {type: 'date', name: 'endTime', required: true, id: 'endTime', label: labels[lang]['endTime']},
            {type: 'text', name: 'ticketPrice', required: true, id: 'ticketPrice', label: labels[lang]['ticketPrice']},
            {
                type: 'file',
                name: 'festivalImage',
                required: true,
                id: 'festivalImage',
                label: labels[lang]['festivalImage']
            }
        ];

        fields.forEach(field => {
            const inputFieldDiv = document.createElement('div');
            inputFieldDiv.className = 'input-field';

            const label = document.createElement('label');
            label.htmlFor = field.id;
            label.textContent = field.label;

            const input = document.createElement('input');
            input.type = field.type;
            input.name = field.name;
            input.required = field.required;
            input.id = field.id;

            inputFieldDiv.appendChild(label);
            inputFieldDiv.appendChild(input);

            festivalForm.appendChild(inputFieldDiv);
        });

        const submitButton = document.createElement('div');
        if (lang === 'fr') {
            submitButton.innerText = 'Ajouter';
        } else if (lang === 'en') {
            submitButton.innerText = 'Add';
        } else if (lang === 'cnko') {
            submitButton.innerText = '추가';
        }
        submitButton.id = 'submit-button';

        submitButton.style.fontFamily = 'Inter-Regular, serif';
        submitButton.style.width = 'fit-content';
        submitButton.style.padding = '1vh';
        submitButton.style.marginBottom = '0.5vh';
        submitButton.style.borderRadius = '5px';
        submitButton.style.color = '#ffffff';
        submitButton.style.background = '#00ADEF';
        submitButton.style.cursor = 'pointer';
        submitButton.style.display = 'flex';
        submitButton.style.alignItems = 'center';
        submitButton.style.justifyContent = 'center';

        festivalForm.appendChild(submitButton);
        festivalForm.style.backgroundColor = '#1d1f27';

        let successMessage = document.createElement('div');
        successMessage.style.color = 'green';
        successMessage.style.fontFamily = 'Inter-Regular, serif';
        successMessage.style.marginTop = '1vh';

        festivalForm.appendChild(successMessage);

        miniPageContainer.appendChild(festivalForm);

        submitButton.addEventListener('click', function (e) {
            e.preventDefault();

            const festivalImage = document.getElementById('festivalImage').files[0];

            if (!validateImage(festivalImage)) {
                return;
            }

            let formData = new FormData();
            formData.append('festivalName', document.getElementById('festivalName').value);
            formData.append('beginTime', document.getElementById('beginTime').value);
            formData.append('endTime', document.getElementById('endTime').value);
            formData.append('ticketPrice', document.getElementById('ticketPrice').value);
            formData.append('festivalImage', festivalImage);

            let xhr = new XMLHttpRequest();
            xhr.open('POST', '../WEB/createFestival.php', true);
            xhr.onload = function () {
                if (this.status === 200) {
                    console.log("Festival created successfully");
                    console.log("response: ", this.responseText);

                    let response = JSON.parse(this.responseText);
                    for (let i = 0; i < response.length; i++) {
                        console.log(response[i]);
                    }

                    if (lang === 'fr') {
                        successMessage.innerText = 'Festival créé avec succès';
                    } else if (lang === 'en') {
                        successMessage.innerText = 'Festival created successfully';
                    } else if (lang === 'cnko') {
                        successMessage.innerText = '축제가 성공적으로 생성되었습니다';
                    }
                } else {
                    console.log('Error status: ' + this.status);
                }
            };
            xhr.onerror = function () {
                console.log('Request failed');
            };
            xhr.send(formData);
        });
    });

    document.getElementById('select-festival-button').addEventListener('click', function () {
        console.log("Affichage de la sélection d'un festival");

        const positionTranslations = {
            "en": {
                "volumeAvantGauche": "Volume at the front (left)",
                "volumeAvantDroite": "Volume at the front (right)",
                "volumeAvant": "Volume at the front",
                "volumeArriereGauche": "Volume at the back (left)",
                "volumeArriereDroite": "Volume at the back (right)",
                "volumeArriere": "Volume at the back",
                "volumeGauche": "Volume (left)",
                "volumeDroite": "Volume (right)"
            },
            "fr": {
                "volumeAvantGauche": "Volume à l'avant (gauche)",
                "volumeAvantDroite": "Volume à l'avant (droite)",
                "volumeAvant": "Volume à l'avant",
                "volumeArriereGauche": "Volume à l'arrière (gauche)",
                "volumeArriereDroite": "Volume à l'arrière (droite)",
                "volumeArriere": "Volume à l'arrière",
                "volumeGauche": "Volume (gauche)",
                "volumeDroite": "Volume (droite)"
            },
            "cnko": {
                "volumeAvantGauche": "앞쪽 볼륨 (왼쪽)",
                "volumeAvantDroite": "앞쪽 볼륨 (오른쪽)",
                "volumeAvant": "앞쪽 볼륨",
                "volumeArriereGauche": "뒤쪽 볼륨 (왼쪽)",
                "volumeArriereDroite": "뒤쪽 볼륨 (오른쪽)",
                "volumeArriere": "뒤쪽 볼륨",
                "volumeGauche": "볼륨 (왼쪽)",
                "volumeDroite": "볼륨 (오른쪽)"
            }
        };

        let miniPageContainer = document.getElementById('mini-page-container');
        miniPageContainer.style.overflowY = 'scroll';
        miniPageContainer.innerHTML = '';

        miniPageContainer.style.msOverflowStyle = "none";
        miniPageContainer.style.scrollbarWidth = "none";

        let styleElement = document.createElement('style');
        styleElement.innerHTML = `
        #mini-page-container::-webkit-scrollbar {
            background: transparent;
            width: 0;
        }`;
        document.head.appendChild(styleElement);

        // Partie #festival-list
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '../Controller/festivalList.php', true);
        xhr.onload = function () {
            if (this.status === 200) {
                let response = JSON.parse(this.responseText);
                console.log("response: ", response);

                const festivalList = document.createElement('div');
                festivalList.style.justifySelf = 'flex-start';
                festivalList.style.width = 'fit-content';
                festivalList.id = 'festival-list';

                response.forEach(festival => {
                    let festivalItem = document.createElement('div');
                    festivalItem.style.backgroundColor = '#1d1f27';
                    festivalItem.style.color = 'white';
                    festivalItem.style.lineHeight = '1.5';

                    festivalItem.style.paddingTop = '2vh';
                    festivalItem.style.paddingBottom = '2vh';
                    festivalItem.style.paddingLeft = '0.5vw';
                    festivalItem.style.paddingRight = '0.5vw';

                    festivalItem.style.marginTop = '2vh';
                    festivalItem.style.marginBottom = '2vh';
                    festivalItem.style.marginRight = '0.5vw';

                    festivalItem.style.width = 'fit-content';
                    festivalItem.style.display = 'flex';
                    festivalItem.style.flexDirection = 'column';
                    festivalItem.style.alignContent = 'center';
                    festivalItem.style.justifyContent = 'center';

                    festivalItem.style.cursor = 'pointer';

                    festivalItem.className = 'festival-item';

                    festivalItem.dataset.festivalId = festival.festivalId;

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

                    let festivalName = document.createElement('div');
                    festivalName.innerText = (festivalNameInd + '' + festival.festivalName);
                    festivalItem.appendChild(festivalName);

                    let festivalBeginTime = document.createElement('div');
                    festivalBeginTime.innerText = (festivalBeginTimeInd + '' + festival.beginTime);
                    festivalItem.appendChild(festivalBeginTime);

                    let festivalEndTime = document.createElement('div');
                    festivalEndTime.innerText = (festivalEndTimeInd + '' + festival.endTime);
                    festivalItem.appendChild(festivalEndTime);

                    let festivalTicketPrice = document.createElement('div');
                    festivalTicketPrice.innerText = (festivalTicketPriceInd + '' + festival.ticketPrice + ' €');
                    festivalItem.appendChild(festivalTicketPrice);

                    let festivalImgIndContainer = document.createElement('div');
                    festivalImgIndContainer.innerText = festivalImgInd;
                    festivalItem.appendChild(festivalImgIndContainer);
                    let festivalImage = document.createElement('img');
                    let festivalDataItem = 'IMG-PATH'
                    festivalImage.src = festival[festivalDataItem];
                    console.log("Image path", festivalImage)
                    festivalImage.style.maxWidth = '20vw';
                    festivalImage.style.maxHeight = '20vw';
                    festivalImage.style.margin = '2vh 0 2vh 0';
                    festivalItem.appendChild(festivalImage);


                    const editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    editButton.addEventListener('click', function () {
                        let existingForm = document.getElementById('festival-edit-form');
                        if (existingForm) {
                            existingForm.remove();
                        }

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

                        festivalIdInput.value = festival.festivalId;
                        festivalNameInput.value = festival.festivalName;
                        beginTimeInput.value = festival.beginTime;
                        endTimeInput.value = festival.endTime;
                        ticketPriceInput.value = festival.ticketPrice;
                    });

                    festivalItem.addEventListener('click', function (event) {
                        let target = event.target;
                        while (target !== this) {
                            if (target.tagName === 'BUTTON' && target.textContent === 'Edit') {
                                return;
                            }
                            target = target.parentNode;
                        }

                        let selectedFestival = document.querySelector('.selected-festival');
                        if (selectedFestival) {
                            if (selectedFestival === this) {
                                return;
                            }
                            selectedFestival.classList.remove('selected-festival');
                        }

                        this.classList.add('selected-festival');
                        console.log('Festival clicked: ', this.dataset.festivalId);

                        sensorElementsContainer.style.alignItems = 'flex-start';

                        while (sensorElementsContainer.firstChild) {
                            sensorElementsContainer.removeChild(sensorElementsContainer.firstChild);
                        }

                        fetchSensorData(this.dataset.festivalId);
                    });

                    festivalItem.appendChild(editButton);
                    festivalList.style.order = '1';
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

        let sensorElementsContainer = document.createElement('div');
        sensorElementsContainer.style.border = '1px solid #5b5d60';
        sensorElementsContainer.style.marginLeft = '10px';
        sensorElementsContainer.style.padding = '10px';
        sensorElementsContainer.style.flexGrow = '1';
        sensorElementsContainer.style.display = 'flex';
        sensorElementsContainer.style.justifyContent = 'center';
        sensorElementsContainer.style.alignItems = 'center';
        sensorElementsContainer.id = 'sensor-elements-container';
        sensorElementsContainer.style.order = '2';
        sensorElementsContainer.style.position = 'sticky';
        sensorElementsContainer.style.top = '0';
        sensorElementsContainer.style.height = '75vh';
        sensorElementsContainer.style.borderRadius = '2vh';

        let placeholder = document.createElement('div');
        placeholder.className = 'placeholder';
        placeholder.style.color = '#5b5d60';
        placeholder.className = 'translatable';
        if (lang === 'fr') {
            placeholder.innerText = 'Sélectionner un festival';
        } else if (lang === 'en') {
            placeholder.innerText = 'Select a festival';
        } else if (lang === 'cnko') {
            placeholder.innerText = '축제 선택';
        }

        sensorElementsContainer.appendChild(placeholder);

        document.getElementById('mini-page-container').appendChild(sensorElementsContainer);

        function fetchSensorData(festivalId) {
            let xhr = new XMLHttpRequest();
            let data = 'festivalId=' + encodeURIComponent(festivalId);
            xhr.open('POST', '../Controller/fetch_sensors_mini_page.php', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(data);
            xhr.onload = function () {
                if (xhr.status !== 200) {
                    alert(`Error ${xhr.status}: ${xhr.statusText}`);
                } else {
                    let data = JSON.parse(xhr.response);

                    console.log('Response data: ', data);

                    placeholder.remove();

                    let sensorContainer = document.createElement('div');
                    sensorContainer.className = 'sensor-container';

                    sensorContainer.style.display = 'grid';
                    sensorContainer.style.gridTemplateColumns = '1fr 1fr';

                    data.sensors.forEach(sensor => {
                        let sensorLatitude = parseInt(sensor.latitude);
                        let sensorLongitude = parseInt(sensor.longitude);

                        let positionKey = 'volume';
                        if (sensorLatitude === 1) {
                            if (sensorLongitude === -1) {
                                positionKey += 'AvantGauche';
                            } else if (sensorLongitude === 1) {
                                positionKey += 'AvantDroite';
                            } else {
                                positionKey += 'Avant';
                            }
                        } else if (sensorLatitude === -1) {
                            if (sensorLongitude === -1) {
                                positionKey += 'ArriereGauche';
                            } else if (sensorLongitude === 1) {
                                positionKey += 'ArriereDroite';
                            } else {
                                positionKey += 'Arriere';
                            }
                        } else {
                            if (sensorLongitude === -1) {
                                positionKey += 'Gauche';
                            } else if (sensorLongitude === 1) {
                                positionKey += 'Droite';
                            }
                        }

                        let sensorElement = document.createElement('div');
                        sensorElement.style.backgroundColor = '#292e37';
                        sensorElement.style.width = '32vw';

                        sensorElement.style.marginTop = '1vh';
                        sensorElement.style.marginBottom = '1vh';
                        sensorElement.style.marginLeft = '1vw';
                        sensorElement.style.marginRight = '1vw';

                        sensorElement.style.paddingTop = '1vh';
                        sensorElement.style.paddingBottom = '1vh';
                        sensorElement.style.paddingLeft = '1vw';
                        sensorElement.style.paddingRight = '1vw';

                        sensorElement.style.borderRadius = '2vh';

                        sensorElement.style.display = 'flex';
                        sensorElement.style.flexDirection = 'column';
                        sensorElement.style.alignItems = 'flex-start';
                        sensorElement.style.justifyContent = 'center';

                        sensorElement.className = 'sensor-element';

                        let sensorElementText = document.createElement('div');

                        sensorElementText.style.display = 'flex';
                        sensorElementText.style.alignItems = 'baseline';
                        sensorElementText.style.justifyContent = 'space-evenly';

                        let positionNameParagraph = document.createElement('p');
                        positionNameParagraph.textContent = positionTranslations[lang][positionKey];

                        let soundDensityParagraph = document.createElement('p');
                        soundDensityParagraph.textContent = (sensor.currentSoundDensity + ' dB');
                        soundDensityParagraph.style.color = getSoundColor(sensor.currentSoundDensity);
                        soundDensityParagraph.style.justifySelf = 'flex-end';
                        soundDensityParagraph.style.paddingLeft = '1vw';
                        soundDensityParagraph.style.fontSize = '2.5vh';
                        soundDensityParagraph.style.fontFamily = 'Inter-Bold, serif'

                        sensorElementText.appendChild(positionNameParagraph);
                        sensorElementText.appendChild(soundDensityParagraph);

                        sensorElement.appendChild(sensorElementText);

                        let sensorElementContent = document.createElement('div');
                        sensorElementContent.style.display = 'flex';
                        sensorElementContent.style.alignItems = 'flex-end';
                        sensorElementContent.style.justifyContent = 'flex-start';

                        sensorContainer.appendChild(sensorElement);
                    });

                    document.getElementById('sensor-elements-container').appendChild(sensorContainer);
                }
            };

            xhr.onerror = function () {
                alert("Request failed");
            };
        }

        document.getElementById('user-list-button').addEventListener('click', function () {
            document.getElementById('sensor-elements-container').remove();
        });

        document.getElementById('add-festival-button').addEventListener('click', function () {
            document.getElementById('sensor-elements-container').remove();
        });
    });

    function validateImage(file) {
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        const maxFileSize = 500000; // 500KB

        if (!validImageTypes.includes(file.type)) {
            console.log('Invalid file type. Only JPG, JPEG, PNG & GIF files are allowed.');
            return false;
        }

        if (file.size > maxFileSize) {
            console.log('File is too large. Maximum size is 500KB.');
            return false;
        }

        return true;
    }

    function getSoundColor(soundValue) {
        if (soundValue > 100) {
            return 'red';
        } else if (soundValue < 80) {
            return 'green';
        } else {
            return 'white';
        }
    }

    document.getElementById('user-list-button').click();
});