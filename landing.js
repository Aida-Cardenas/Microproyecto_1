//Obtener el nombre del jugador y redirigir al juego
document.getElementById('playerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe sin nombre

    // Obtener el valor del campo de texto
    const playerName = document.getElementById('playerName').value.trim(); 

    // Validar que el nombre no esté vacío
    if (!playerName) {
        alert("Por favor, ingresa tu nombre."); 
        return; 
    }

    // Guardar el nombre en localStorage
    localStorage.setItem('playerName', playerName);

    // Redirigir al juego
    window.location.href = 'game.html';
});

//Mostrar el leaderboard
function displayLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const leaderboardBody = document.getElementById('leaderboardBody');

    // Ordenar el leaderboard de mayor a menor puntaje y limitar a 5 entradas
    const top5 = leaderboard.sort((a, b) => b.score - a.score).slice(0, 5);

    // Limpiar el contenido actual de la tabla
    leaderboardBody.innerHTML = '';

    // Generar las filas de la tabla
    top5.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.name}</td> 
            <td>${entry.score}</td>
        `;
        leaderboardBody.appendChild(row);
    });
}

displayLeaderboard();