document.querySelector('#festival-recherche').addEventListener('input', function () {
    const festivalName = this.value;
    const urlParams = new URLSearchParams(window.location.search);
    let lang = urlParams.get('lang');

    let translations = {
        "en": {
            "volumeArriere": "Back volume",
            "volumeArriereDroite": "Back volume (right)",
            "volumeArriereGauche": "Back volume (left)",
            "volumeAvant": "Front volume",
            "volumeAvantDroite": "Front volume (right)",
            "volumeAvantGauche": "Front volume (left)",
            "volumeGauche": "Left volume",
            "volumeDroite": "Right volume",
            "monterSon": "Increase volume",
            "baisserSon": "Decrease volume"
        },
        "fr": {
            "volumeArriere": "Volume à l'arrière",
            "volumeArriereDroite": "Volume à l'arrière (droite)",
            "volumeArriereGauche": "Volume à l'arrière (gauche)",
            "volumeAvant": "Volume à l'avant",
            "volumeAvantDroite": "Volume à l'avant (droite)",
            "volumeAvantGauche": "Volume à l'avant (gauche)",
            "volumeGauche": "Volume à gauche",
            "volumeDroite": "Volume à droite",
            "monterSon": "Monter le son",
            "baisserSon": "Baisser le son"
        },
        "cnko": {
            "volumeArriere": "뒤 음량",
            "volumeArriereDroite": "뒤 (오른쪽) 음량",
            "volumeArriereGauche": "뒤 (왼쪽) 음량",
            "volumeAvant": "앞 음량",
            "volumeAvantDroite": "앞 (오른쪽) 음량",
            "volumeAvantGauche": "앞 (왼쪽) 음량",
            "volumeGauche": "왼쪽 음량",
            "volumeDroite": "오른쪽 음량",
            "monterSon": "소리 높이기",
            "baisserSon": "소리 줄이기"
        }
    };

    if (!festivalName) {
        console.log('Input is empty');
        return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '../Controller/fetch_sensors.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (this.status === 200) {
            const response = JSON.parse(this.responseText);
            const sensors = response.sensors;
            const imgpath = response.imgpath;
            console.log("Chemin vers l'image du festival: ", imgpath);
            console.log("Capteurs récupérés: ", sensors);

            document.getElementById('sensor-elements-container').style.display = 'block';
            document.getElementById('festival-banner-container').innerHTML = '';
            document.getElementById('festival-banner-container').innerHTML = '<img class="center-column" src="' + imgpath + '" alt="Festival image" />';
            document.getElementById('festival-banner-container').style.minHeight = 'fit-content';

            let sensorContainer = document.querySelector('#sensor-elements-container');
            sensorContainer.innerHTML = '';

            sensors.forEach(function (sensor) {
                console.log("L'attribut sensor contient: ", sensor)
                let sensorSoundDensity = parseInt(sensor.currentSoundDensity);
                console.log("La densité sonore est de: ", sensorSoundDensity)
                let sensorLatitude = parseInt(sensor.latitude);
                console.log("La latitude est de: ", sensorLatitude)
                let sensorLongitude = parseInt(sensor.longitude);
                console.log("La longitude est de: ", sensorLongitude)
                let sensorElement = document.createElement('div');
                sensorElement.className = 'sensor-element';
                sensorElement.dataset.sensorId = sensor.sensorId;


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

                let avisVolume = document.createElement('div');
                avisVolume.className = 'avis-volume';

                let captPosition = document.createElement('p');
                captPosition.className = 'traductible capt-position';
                captPosition.innerText = translations[lang][positionKey];
                avisVolume.appendChild(captPosition);

                let voteButtonsContainer = document.createElement('div');
                voteButtonsContainer.className = 'vote-buttons-container';

                let monterSon = document.createElement('div');
                monterSon.className = 'avis-son traductible monter-son';
                monterSon.innerText = translations[lang]["monterSon"];
                voteButtonsContainer.appendChild(monterSon);

                let baisserSon = document.createElement('div');
                baisserSon.className = 'avis-son traductible baisser-son';
                baisserSon.innerText = translations[lang]["baisserSon"];
                voteButtonsContainer.appendChild(baisserSon);

                avisVolume.appendChild(voteButtonsContainer);
                sensorElement.appendChild(avisVolume);

                let soundLevel = document.createElement('div');
                soundLevel.className = 'sound-level';

                let soundColor = 'soundwhite';
                if (sensorSoundDensity > 100) {
                    soundLevel.style.color = '#f73e3e';
                } else if (sensorSoundDensity < 80) {
                    soundLevel.style.color = '#90ee90';
                } else {
                    soundLevel.style.color = '#ffffff';
                }

                soundLevel.innerHTML = '<div class="volume ' + soundColor + '"><p>' + sensorSoundDensity + '</p></div><div class="db"><p>dB</p></div>';

                sensorElement.appendChild(soundLevel);
                let sensorContainer = document.querySelector('#sensor-elements-container');
                sensorContainer.appendChild(sensorElement);
            });
        } else {
            console.log('Error status: ' + this.status);
        }
    };
    xhr.onerror = function () {
        console.log('Request failed');
    };
    xhr.send('festivalName=' + encodeURIComponent(festivalName));
});

document.addEventListener('DOMContentLoaded', function () {
    console.log("c'est parti'");

    document.querySelector('#sensor-elements-container').addEventListener('click', function (event) {
        if (event.target.matches('.monter-son')) {
            sendVoteToDatabase(event.target.closest('.sensor-element').dataset.sensorId, 'up');
        } else if (event.target.matches('.baisser-son')) {
            sendVoteToDatabase(event.target.closest('.sensor-element').dataset.sensorId, 'down');
        }
    });

    function sendVoteToDatabase(sensorId, vote) {
        console.log('Sending vote to database: ', sensorId, vote); // Log the sensorId and vote

        let xhr = new XMLHttpRequest();
        xhr.open('POST', '../Controller/vote_handler.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            if (this.status === 200) {
                console.log('Response from server: ', this.responseText); // Log the server response
            } else {
                console.log('Error status: ' + this.status);
            }
        };
        xhr.onerror = function () {
            console.log('Request failed');
        };
        xhr.send('sensorId=' + encodeURIComponent(sensorId) + '&vote=' + encodeURIComponent(vote));
    }
});