document.querySelector('#festival-recherche').addEventListener('input', function () {
    const festivalName = this.value;

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