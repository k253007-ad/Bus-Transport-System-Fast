// Bus stops data
let stops = [
    "2K Stop", 
    "Chota Gate", 
    "Drigh Road", 
    "Korangi Crossing", 
    "Malir Cant", 
    "Malir Halt", 
    "Model Colony", 
    "Shah Faisal Town", 
    "Sharfabad"
];

// Buses data
const buses = [
    {
        id: 1,
        name: "1-B",
        stops: ["Korangi Crossing", "Malir Cant", "Model Colony", "Malir Halt", "Shah Faisal Town"],
        filledSeats: 35,
        totalSeats: 50
    },
    {
        id: 2,
        name: "29",
        stops: ["2K Stop", "Chota Gate", "Malir Cant", "Shah Faisal Town"],
        filledSeats: 42,
        totalSeats: 50
    },
    {
        id: 3,
        name: "5",
        stops: ["Drigh Road", "Malir Halt", "Model Colony", "Sharfabad"],
        filledSeats: 28,
        totalSeats: 45
    },
    {
        id: 4,
        name: "Bus-4",
        stops: ["Chota Gate", "Shah Faisal Town", "Malir Cant"],
        filledSeats: 45,
        totalSeats: 50
    }
];

// Helper function to get current page (works with GitHub Pages)
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1);
    return page || 'index.html';
}

// Helper function to navigate (works with GitHub Pages)
function navigateTo(page) {
    const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    window.location.href = basePath + page;
}

// ========== INDEX PAGE FUNCTIONALITY ==========
if (getCurrentPage() === 'index.html' || getCurrentPage() === '') {
    // Populate stops list
    const stopsList = document.getElementById("stopsList");
    if (stopsList) {
        stopsList.innerHTML = stops.map(stop => 
            `<li><i class="fas fa-map-pin"></i> ${stop}</li>`
        ).join('');

        // Add click handlers to all stop items
        const allLi = document.querySelectorAll("#stopsList li");
        allLi.forEach(element => {
            element.onclick = () => {
                const stopName = element.textContent.trim();
                sessionStorage.setItem('selectedStop', stopName);
                const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
                window.location.href = basePath + `stops.html?stop=${encodeURIComponent(stopName)}`;
            };
        });
    }

    // Filter list function
    window.filterList = function() {
        const input = document.getElementById('searchInput');
        const filter = input.value.toLowerCase();
        const li = document.querySelectorAll("#stopsList li");
        const clearBtn = document.querySelector('.clear-btn');
        const stopsCount = document.getElementById('stopsCount');
        
        let visibleCount = 0;
        
        li.forEach(item => {
            const textValue = item.textContent || item.innerText;
            const isVisible = textValue.toLowerCase().includes(filter);
            item.style.display = isVisible ? '' : 'none';
            if (isVisible) visibleCount++;
        });

        // Update count
        if (stopsCount) {
            stopsCount.textContent = `${visibleCount} stop${visibleCount !== 1 ? 's' : ''} ${filter ? 'found' : 'available'}`;
        }

        // Show/hide clear button
        if (clearBtn) {
            clearBtn.style.display = filter ? 'block' : 'none';
        }
    };

    // Clear search function
    window.clearSearch = function() {
        const input = document.getElementById('searchInput');
        if (input) {
            input.value = '';
            filterList();
            input.focus();
        }
    };
}

// ========== STOPS PAGE FUNCTIONALITY ==========
if (getCurrentPage() === 'stops.html') {
    const stopNameElement = document.getElementById('stopName');
    const urlParams = new URLSearchParams(window.location.search);
    const stopFromUrl = urlParams.get('stop');
    const stopFromStorage = sessionStorage.getItem('selectedStop');
    const selectedStop = stopFromUrl || stopFromStorage;

    // Display selected stop
    if (selectedStop && stopNameElement) {
        stopNameElement.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${selectedStop}`;
        document.title = selectedStop + ' - Stop Details';
    } else if (stopNameElement) {
        stopNameElement.innerHTML = '<i class="fas fa-exclamation-circle"></i> No stop selected';
        stopNameElement.style.color = '#999';
    }

    // Display buses for this stop
    const busesList = document.getElementById('busesList');
    if (busesList && selectedStop) {
        const filteredBuses = buses.filter(bus => bus.stops.includes(selectedStop));
        
        if (filteredBuses.length > 0) {
            busesList.innerHTML = filteredBuses.map(bus => {
                const capacityPercent = (bus.filledSeats / bus.totalSeats) * 100;
                const capacityClass = capacityPercent < 70 ? 'low' : capacityPercent < 90 ? 'medium' : 'high';
                const badgeClass = capacityPercent < 70 ? 'badge-low' : capacityPercent < 90 ? 'badge-medium' : 'badge-high';
                const badgeText = capacityPercent < 70 ? 'Available' : capacityPercent < 90 ? 'Filling Up' : 'Almost Full';

                return `
                    <li onclick="viewBusDetails(${bus.id})">
                        <div class="bus-item">
                            <div class="bus-info-left">
                                <div class="bus-icon">
                                    <i class="fas fa-bus"></i>
                                </div>
                                <div class="bus-details">
                                    <h3>${bus.name}</h3>
                                    <div class="bus-route">
                                        <i class="fas fa-route"></i>
                                        ${bus.stops.length} stops
                                    </div>
                                </div>
                            </div>
                            <div class="bus-info-right">
                                <div class="bus-seats">
                                    <div class="seats-count">${bus.filledSeats}/${bus.totalSeats} seats</div>
                                    <div class="capacity-bar-container">
                                        <div class="capacity-bar capacity-${capacityClass}" style="width: ${capacityPercent}%"></div>
                                    </div>
                                    <span class="capacity-badge ${badgeClass}">${badgeText}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                `;
            }).join('');

            // Update stats
            const totalBusesEl = document.getElementById('totalBuses');
            const avgCapacityEl = document.getElementById('avgCapacity');
            
            if (totalBusesEl) {
                totalBusesEl.textContent = filteredBuses.length;
            }
            
            if (avgCapacityEl) {
                const avgCapacity = Math.round(
                    filteredBuses.reduce((sum, bus) => sum + (bus.filledSeats / bus.totalSeats * 100), 0) / filteredBuses.length
                );
                avgCapacityEl.textContent = avgCapacity + '%';
            }
        } else {
            busesList.innerHTML = `
                <li class="no-buses">
                    <div style="text-align: center; padding: 2rem;">
                        <i class="fas fa-bus-alt" style="font-size: 4rem; color: #ddd; margin-bottom: 1rem;"></i>
                        <h3 style="color: #333; margin-bottom: 0.5rem;">No buses available</h3>
                        <p style="color: #999;">No buses currently serve this stop</p>
                    </div>
                </li>
            `;
        }
    }

    // Function to view bus details
    window.viewBusDetails = function(busId) {
        sessionStorage.setItem('selectedBusId', busId);
        sessionStorage.setItem('fromStop', selectedStop);
        const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
        window.location.href = basePath + `busDetails.html?bus=${busId}`;
    };
}

// ========== BUS DETAILS PAGE FUNCTIONALITY ==========
if (getCurrentPage() === 'busDetails.html') {
    const urlParams = new URLSearchParams(window.location.search);
    const busIdFromUrl = urlParams.get('bus');
    const busIdFromStorage = sessionStorage.getItem('selectedBusId');
    const busId = parseInt(busIdFromUrl || busIdFromStorage);
    const fromStop = sessionStorage.getItem('fromStop');

    const selectedBus = buses.find(bus => bus.id === busId);

    if (selectedBus) {
        // Update bus name
        const busNameEl = document.getElementById('busName');
        if (busNameEl) {
            busNameEl.innerHTML = `Bus ${selectedBus.name}`;
            document.title = `Bus ${selectedBus.name} - Route Details`;
        }

        // Update stats
        const totalStopsEl = document.getElementById('totalStops');
        const filledSeatsEl = document.getElementById('filledSeats');
        const availableSeatsEl = document.getElementById('availableSeats');
        const capacityPercentEl = document.getElementById('capacityPercent');

        if (totalStopsEl) totalStopsEl.textContent = selectedBus.stops.length;
        if (filledSeatsEl) filledSeatsEl.textContent = selectedBus.filledSeats;
        if (availableSeatsEl) availableSeatsEl.textContent = selectedBus.totalSeats - selectedBus.filledSeats;
        
        const capacityPercent = Math.round((selectedBus.filledSeats / selectedBus.totalSeats) * 100);
        if (capacityPercentEl) capacityPercentEl.textContent = capacityPercent + '%';

        // Update capacity bar
        const capacityFillEl = document.getElementById('capacityFill');
        const capacityTextEl = document.getElementById('capacityText');
        
        if (capacityFillEl && capacityTextEl) {
            setTimeout(() => {
                capacityFillEl.style.width = capacityPercent + '%';
                capacityTextEl.textContent = capacityPercent + '%';
                
                // Change color based on capacity
                if (capacityPercent >= 90) {
                    capacityFillEl.classList.add('high');
                } else if (capacityPercent >= 70) {
                    capacityFillEl.classList.add('medium');
                }
            }, 300);
        }

        // Create route map
        const routeMapEl = document.getElementById('routeMap');
        if (routeMapEl) {
            const routeHTML = selectedBus.stops.map((stop, index) => {
                const isFirstStop = index === 0;
                const isLastStop = index === selectedBus.stops.length - 1;
                const isCurrentStop = stop === fromStop;
                
                let dotClass = 'stop-dot';
                if (isFirstStop) dotClass += ' first-stop';
                if (isLastStop) dotClass += ' last-stop';
                if (isCurrentStop) dotClass += ' current-stop';

                const estimatedTime = index * 5; // 5 minutes between stops
                
                return `
                    <div class="route-stop" style="animation-delay: ${index * 0.1}s">
                        <div class="stop-indicator">
                            <div class="${dotClass}"></div>
                            ${!isLastStop ? '<div class="stop-line"></div>' : ''}
                        </div>
                        <div class="stop-info">
                            <span class="stop-number">Stop ${index + 1}</span>
                            <div class="stop-name">
                                ${stop}
                                ${isCurrentStop ? ' <i class="fas fa-star" style="color: #f59e0b;"></i>' : ''}
                            </div>
                            <div class="stop-details">
                                <div class="stop-detail-item">
                                    <i class="fas fa-clock"></i>
                                    <span>${estimatedTime} min</span>
                                </div>
                                ${isFirstStop ? '<div class="stop-detail-item"><i class="fas fa-flag-checkered"></i><span>Start</span></div>' : ''}
                                ${isLastStop ? '<div class="stop-detail-item"><i class="fas fa-flag"></i><span>End</span></div>' : ''}
                                ${isCurrentStop ? '<div class="stop-detail-item"><i class="fas fa-location-dot"></i><span>Your Stop</span></div>' : ''}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            routeMapEl.innerHTML = routeHTML;
        }
    } else {
        // Bus not found
        const busNameEl = document.getElementById('busName');
        if (busNameEl) {
            busNameEl.innerHTML = '<i class="fas fa-exclamation-circle"></i> Bus not found';
        }
        
        const routeMapEl = document.getElementById('routeMap');
        if (routeMapEl) {
            routeMapEl.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: #999;">
                    <i class="fas fa-bus-alt" style="font-size: 4rem; margin-bottom: 1rem;"></i>
                    <h3>Bus information not available</h3>
                    <p>Please select a bus from the stops page</p>
                </div>
            `;
        }
    }
}

// Add smooth scroll behavior
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth transitions to all interactive elements
    const style = document.createElement('style');
    style.textContent = `
        * {
            scroll-behavior: smooth;
        }
    `;
    document.head.appendChild(style);
});
