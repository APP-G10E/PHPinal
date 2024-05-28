document.querySelector('#festival-recherche').addEventListener('change', function() {
    var festivalName = this.value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'fetch_sensors.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (this.status == 200) {
            var sensors = JSON.parse(this.responseText);

            var sensorContainer = document.querySelector('#sensor-elements-container');
            sensorContainer.innerHTML = '';  // Clear current sensor elements

            // Create new sensor elements
            sensors.forEach(function(sensor) {
                var sensorElement = document.createElement('div');
                sensorElement.className = 'sensor-element';

                // Add sensor details to sensorElement here...
                // For example, to set the sound level:
                var soundLevel = document.createElement('div');
                soundLevel.className = 'sound-level';
                soundLevel.innerHTML = '<div class="volume soundgreen"><p>' + sensor.soundLevel + '</p></div><div class="db"><p>dB</p></div>';

                sensorElement.appendChild(soundLevel);
                sensorContainer.appendChild(sensorElement);
            });
        }
    };
    xhr.send('festivalName=' + encodeURIComponent(festivalName));
});