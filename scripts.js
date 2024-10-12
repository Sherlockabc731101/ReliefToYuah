// Initialize the map
const map = L.map('map').setView([27.9944024, -81.7602544], 7); // Center of Florida

const southWest = L.latLng(24.396308, -87.634938); // Southwest corner of Florida
const northEast = L.latLng(31.000968, -79.974307); // Northeast corner of Florida
const bounds = L.latLngBounds(southWest, northEast);

// Add a tile layer (you can use other providers like OpenStreetMap)
/*L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);*/
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png').addTo(map).getContainer().classList.add('water-color');

map.setMaxBounds(bounds);
map.setMaxZoom(14);
map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: false });
});

// Major metropolitan areas in Florida with coordinates
const cities = [
    { name: "Miami", coords: [25.7617, -80.1918], id: "miami", population: 454279 },
    { name: "Tampa", coords: [27.9506, -82.4572], id: "tampa", population: 399700 },
    { name: "Orlando", coords: [28.5383, -81.3792], id: "orlando", population: 287442 },
    { name: "Jacksonville", coords: [30.3322, -81.6557], id: "jacksonville", population: 949611 },
    { name: "Tallahassee", coords: [30.4383, -84.2807], id: "tallahassee", population: 191049 }
];

const towns = [
    { name: "West Palm Beach", coords: [26.7153, -80.0534], id: "west_palm_beach", population: 117415 },
    { name: "Fort Myers", coords: [26.6406, -81.8723], id: "fort_myers", population: 87713 },
    { name: "Melbourne", coords: [28.0836, -80.6077], id: "melbourne", population: 81865 },
    { name: "Daytona Beach", coords: [29.2108, -81.0228], id: "daytona_beach", population: 69186 },
    { name: "Gainesville", coords: [29.6516, -82.3248], id: "gainesville", population: 133857 },
    { name: "Pensacola", coords: [30.4213, -87.2169], id: "pensacola", population: 52983 }, 
    { name: "Key West", coords: [24.5551, -81.7800], id: "key_west", population: 24643 }
];

// Add bubbles to the map
function createBubble(city) {
    const innerRadius = 15000;
    const gap = 4500; // Adjust this value to control the gap size
    const outerRadius = innerRadius + gap;

    //const marker = L.marker(city.coords).addTo(map);
    /*const marker = L.marker(city.coords, {
        icon: L.divIcon({ className: 'invisible-marker', iconSize: [0, 0], iconAnchor: [0, 0] }) // Set icon size to [0, 0]
    }).addTo(map);*/

    /*const marker = L.marker(city.coords, {
        icon: L.divIcon({ className: 'invisible-marker', iconSize: [100, 100], iconAnchor: [0, 0] }), // Keep size but transparent
        opacity: 0 // Set opacity to 0 to make it invisible
    }).addTo(map);
    
    marker.cityName = city.id;*/

    // Inner opaque circle
    innerCircle = L.circle(city.coords, {
        color: '#b61111',
        fillColor: '#b61111', //#df2c2c
        fillOpacity: 1,
        radius: innerRadius
    }).addTo(map).bindPopup(`<b>${city.name}</b><br>Population: ${city.population}`);

    // Outer thin circle
    outerCircle = L.circle(city.coords, {
        color: '#b61111',
        fillOpacity: 0,
        weight: 2,
        radius: outerRadius
    }).addTo(map);

    /*marker.on('click', function () {
        window.location.href = `fl_cities/${this.cityName}.html`; // Redirect to the city page in the fl_cities folder
    });*/
    outerCircle.on('click', function () {
        window.location.href = `fl_cities/${city.id}.html`; // Redirect to the city page in the fl_cities folder
    });
    
    // Custom icon with city name
    const icon = L.divIcon({
        html: `<div class="city_icon" style="white-space: nowrap; position: relative; left: 35px; transform: translate(-50%, -50%);">${city.name}</div>`,
        className: '' // Remove default styles
    });

    // Add marker with custom icon to the map
    citytext = L.marker(city.coords, { icon: icon }).addTo(map);
    citytext.on('click', function () {
        window.location.href = `fl_cities/${city.id}.html`; // Redirect to the city page in the fl_cities folder
    });
}

function createTownBubble(city) {
    const innerRadius = 8000;
    const gap = 4500; // Adjust this value to control the gap size
    const outerRadius = innerRadius + gap;

    // Inner opaque circle
    innerCircle = L.circle(city.coords, {
        color: '#b61111',
        fillColor: '#b61111', //#df2c2c
        fillOpacity: 1,
        radius: innerRadius,
    }).addTo(map).bindPopup(`<b>${city.name}</b><br>Population: ${city.population}`);

    // Outer thin circle
    outerCircle = L.circle(city.coords, {
        color: '#b61111',
        fillOpacity: 0,
        weight: 2,
        radius: outerRadius 
    }).addTo(map);

    
    outerCircle.on('click', function () {
        window.location.href = `fl_cities/${city.id}.html`; // Redirect to the city page in the fl_cities folder
    });

    
    // Custom icon with city name
    const icon = L.divIcon({
        html: `<div class="town_icon" style="white-space: nowrap; position: relative; left: 35px; transform: translate(-50%, -50%);">${city.name}</div>`,
        className: '' // Remove default styles
    });

    // Add marker with custom icon to the map
    citytext = L.marker(city.coords, { icon: icon }).addTo(map);
    citytext.on('click', function () {
        window.location.href = `fl_cities/${city.id}.html`; // Redirect to the city page in the fl_cities folder
    });
}

cities.forEach(city => {
    createBubble(city);
});

towns.forEach(town => {createTownBubble(town);})