// geolocation.js
document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetch(`https://geocode.xyz/${lat},${lon}?geoit=json`)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('location').textContent = data.country;
                })
                .catch(error => console.error('Error fetching location:', error));
        }, error => {
            console.error('Error getting geolocation:', error);
            document.getElementById('location').textContent = 'No se pudo obtener la ubicación';
        });
    } else {
        document.getElementById('location').textContent = 'Geolocalización no soportada';
    }
});
