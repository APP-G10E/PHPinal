document.querySelector('#festival-recherche').addEventListener('input', function () {
    const festivalName = this.value;
    let lang = localStorage.getItem('lang');

    let translations = {
        "en": {
            "volumeArriere": "Back volume",
            "volumeArriereDroite": "Back volume (right)",
            "volumeArriereGauche": "Back volume (left)",
            "volumeAvant": "Front volume",
            "volumeAvantDroite": "Front volume (right)",
            "volumeAvantGauche": "Front volume (left)",
            "volumeGauche": "Left volume",
            "volumeDroite": "Right volume"
        },
        "fr": {
            "volumeArriere": "Volume à l'arrière",
            "volumeArriereDroite": "Volume à l'arrière (droite)",
            "volumeArriereGauche": "Volume à l'arrière (gauche)",
            "volumeAvant": "Volume à l'avant",
            "volumeAvantDroite": "Volume à l'avant (droite)",
            "volumeAvantGauche": "Volume à l'avant (gauche)",
            "volumeGauche": "Volume à gauche",
            "volumeDroite": "Volume à droite"
        },
        "cnko": {
            "volumeArriere": "뒤 음량",
            "volumeArriereDroite": "뒤 (오른쪽) 음량",
            "volumeArriereGauche": "뒤 (왼쪽) 음량",
            "volumeAvant": "앞 음량",
            "volumeAvantDroite": "앞 (오른쪽) 음량",
            "volumeAvantGauche": "앞 (왼쪽) 음량",
            "volumeGauche": "왼쪽 음량",
            "volumeDroite": "오른쪽 음량"
        }
    };

    if (!festivalName) {
        console.log('Input is empty');
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '../Controller/fetch_sensors.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (this.status === 200) {
            const sensors = JSON.parse(this.responseText);
            console.log("Capteurs récupérés: ", sensors);

            let sensorContainer = document.querySelector('#sensor-elements-container');
            sensorContainer.innerHTML = '';

            sensors.forEach(function (sensor) {
                console.log("L'attribut sensor contient: ", sensor)
                let sensorSoundDensity = sensor.currentSoundDensity;
                console.log("La densité sonore est de: ", sensorSoundDensity)
                let sensorLatitude = sensor.latitude;
                console.log("La latitude est de: ", sensorLatitude)
                let sensorLongitude = sensor.longitude;
                console.log("La longitude est de: ", sensorLongitude)
                let sensorElement = document.createElement('div');
                sensorElement.className = 'sensor-element';

                let positionKey = 'volume';
                if (sensorLatitude === 1) {
                    positionKey += 'Avant';
                } else if (sensorLatitude === -1) {
                    positionKey += 'Arriere';
                } else if (sensorLatitude === 0) {
                    if (sensorLongitude === 1) {
                        positionKey = 'volumeDroite';
                    } else if (sensorLongitude === -1) {
                        positionKey = 'volumeGauche';
                    }
                } else {
                    if (sensorLongitude === 1) {
                        positionKey += 'Droite';
                    } else if (sensorLongitude === -1) {
                        positionKey += 'Gauche';
                    }
                }

                let translatedPosition = translations[lang][positionKey];

                console.log("positionKey", positionKey);
                let avisVolume = document.createElement('div');
                avisVolume.className = 'avis-volume';

                let captPosition = document.createElement('p');
                captPosition.className = 'traductible capt-position';
                captPosition.setAttribute('data-translation-key', positionKey);
                avisVolume.appendChild(captPosition);

                let voteButtonsContainer = document.createElement('div');
                voteButtonsContainer.className = 'vote-buttons-container';

                let monterSon = document.createElement('div');
                monterSon.className = 'avis-son traductible monter-son';
                monterSon.setAttribute('data-translation-key', 'monterSon');
                voteButtonsContainer.appendChild(monterSon);

                let baisserSon = document.createElement('div');
                baisserSon.className = 'avis-son traductible baisser-son';
                baisserSon.setAttribute('data-translation-key', 'baisserSon');
                voteButtonsContainer.appendChild(baisserSon);

                avisVolume.appendChild(voteButtonsContainer);
                sensorElement.appendChild(avisVolume);

                let soundLevel = document.createElement('div');
                soundLevel.className = 'sound-level';

                let soundColor = 'soundwhite';
                if (sensorSoundDensity > 100) {
                    soundColor = 'soundred';
                } else if (sensorSoundDensity < 80) {
                    soundColor = 'soundgreen';
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