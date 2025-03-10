// Sample data storage (replace with actual database if needed)
let rooms = {};

// Render Rooms
function renderRooms() {
    const container = document.getElementById('room-cards');
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    container.innerHTML = '';
    let totalRooms = 0;

    for (const roomId in rooms) {
        const room = rooms[roomId];
        if (room.name.toLowerCase().includes(searchQuery)) {
            totalRooms++;
            const card = document.createElement('div');
            card.className = 'room-card';
            card.innerHTML = `
                <h4>${room.name}</h4>
                <p>Device: ${room.deviceID || 'Not assigned'}</p>
                <button onclick="deleteRoom('${roomId}')"><i class="fas fa-trash"></i> Delete</button>
            `;
            container.appendChild(card);
        }
    }
    document.getElementById('total-rooms').textContent = totalRooms;
    updateDropdowns();
}

// Update Dropdowns
function updateDropdowns() {
    const roomSelectDevice = document.getElementById('roomSelectDevice');
    roomSelectDevice.innerHTML = '<option value="">Select Room</option>';
    for (const roomId in rooms) {
        const option = document.createElement('option');
        option.value = roomId;
        option.textContent = rooms[roomId].name;
        roomSelectDevice.appendChild(option);
    }
}

// Add Room
function addRoom() {
    const roomName = document.getElementById('roomNameInput').value.trim();
    if (roomName) {
        const roomId = Date.now().toString();
        rooms[roomId] = { name: roomName, deviceID: null };
        document.getElementById('roomNameInput').value = '';
        closeModal('addRoomModal');
        renderRooms();
    } else {
        alert('Please enter a room name.');
    }
}

// Assign Device
function assignDevice() {
    const roomId = document.getElementById('roomSelectDevice').value;
    const deviceId = document.getElementById('deviceIdInput').value.trim();
    if (roomId && deviceId) {
        rooms[roomId].deviceID = deviceId;
        document.getElementById('deviceIdInput').value = '';
        closeModal('assignDeviceModal');
        renderRooms();
    } else {
        alert('Please select a room and enter a device ID.');
    }
}

// Delete Room
function deleteRoom(roomId) {
    if (confirm('Are you sure you want to delete this room?')) {
        delete rooms[roomId];
        renderRooms();
    }
}

// Reset Dashboard
function resetDashboard() {
    if (confirm('Are you sure you want to reset all data?')) {
        rooms = {};
        renderRooms();
    }
}

// Modal Controls
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Search Functionality
document.getElementById('searchInput').addEventListener('input', renderRooms);

// Initial Render
renderRooms();
