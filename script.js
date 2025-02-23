// Check login status immediately when page loads
if (!window.location.pathname.includes('login.html')) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
    }
}

const ADMIN_USERNAME = "admin";

// Logging system that only works for admin
function createLog(action, details) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (currentUser && currentUser.username === ADMIN_USERNAME) {
        const timestamp = new Date().toISOString();
        const logEntry = `
            Time: ${timestamp}
            User: ${details.user}
            Action: ${action}
            IP: ${details.ip || 'Unknown'}
            Page: ${window.location.pathname}
            Browser: ${navigator.userAgent}
            --------------------------
        `;
        
        const blob = new Blob([logEntry], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `scp_log_${Date.now()}.txt`;
        a.click();
    }
}

// Add this to your login validation
function validateLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        createLog('LOGIN', {
            user: username,
            ip: 'Client-IP'
        });
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'index.html';
    }
}

// User data
const users = [
    { username: "investigador1", password: "scp123", level: "1" },
    { username: "investigador2", password: "scp456", level: "2" },
    { username: "admin", password: "scp789", level: "3" },
    { username: "omni", password: "omni", level: "6" }
];

const locations = [
    { name: "Sitio-19", description: "Instalación principal de contención", level: "2" },
    { name: "Área-12", description: "Centro de investigación biológica", level: "2" },
    { name: "Sector-D", description: "Almacén de objetos Keter", level: "3" }
];

const reports = [
    { title: "Informe 1123-A", description: "Brecha de contención SCP-173", date: "2023-10-01", level: "3" },
    { title: "Informe 1124-B", description: "Experimento fallido D-Class", date: "2023-10-15", level: "2" },
    { title: "Informe 1125-C", description: "Protocolo de emergencia", date: "2023-10-30", level: "3" }
];

const scps = [
    {
        id: "173",
        name: "La Escultura",
        class: "Euclid",
        level: "1",
        preview: "Estatua humanoide de concreto y barras de refuerzo...",
        fullDescription: "Estatua humanoide de concreto y barras de refuerzo. Se mueve a velocidades extremadamente altas cuando no es observada directamente.",
        containment: "SCP-173 debe ser almacenado en un contenedor sellado de clase 5. Personal que ingrese al contenedor debe mantener contacto visual en todo momento...",
        image: "scp173.jpg",
        procedures: "No menos de 3 personas pueden entrar al contenedor de SCP-173...",
        incidents: [
            {
                date: "██/██/████",
                description: "Brecha de contención en Sector-19. 3 bajas confirmadas."
            }
        ]
    },
    {
        id: "049",
        name: "El Doctor Plaga",
        class: "Euclid",
        level: "2",
        preview: "Humanoide que viste túnica negra y máscara de médico de la peste...",
        fullDescription: "Entidad humanoide que viste una túnica negra medieval y una máscara característica de médico de la peste del siglo XIV-XV.",
        containment: "SCP-049 debe ser contenido en una celda segura de contención médica...",
        image: "scp049.jpg",
        procedures: "Todo personal debe mantener una distancia mínima de 3 metros...",
        incidents: [
            {
                date: "██/██/████",
                description: "Experimento 049-T1: Conversión de D-Class"
            }
        ]
    },
{
    id: "1002",
    name: "Oscuro Ángel",
    class: "Apollyon",
    level: "5",
    preview: "Algunos lo describen como una criatura del inframundo, otros como un ángel...",
    fullDescription: "El SCP-1002, conocido como 'Oscuro Ángel', es una criatura paralela proveniente de otra dimensión, cuya aparición surgió después de que un portal interdimensional se abriera en el norte. Días después de su cierre, se detectaron rasgos de inundaciones o avalanchas nunca antes vistas. Cuando empeoró todo, un equipo E-11 se dirigió hacia el lugar a hacer la expedición. En la búsqueda, se detectaron signos de vida cerca, ya que había huellas tapadas por la nieve. Casi al límite de cancelar la búsqueda, una avalancha cayó encima del escuadrón, un sonido extraño aullaba y parecía decir conjuros o algún tipo de magia. Las cámaras del escuadrón quedaron inutilizables por los golpes y no hubo ni rastros del escuadrón el cual desapareció después de la avalancha. El Consejo estaba enfadado, era una amenaza grave, cuyo poder no puede pertenecer a este lugar. El caso quedó en búsqueda durante un largo periodo... 2 Años después... El Dr. Michael fue encomendado a buscar unos documentos de 999, cuando entró en una sala que nunca había visto antes miró en el cajón clasificado en keter, y encontró unos papeles antiguos y arrugados. En esos documentos, había evidencias de un SCP denominado 1002. Un hechicero o mago con mucho poder que supuestamente escapó de las instalaciones hace mucho tiempo. Su descripción era tal que así: Una criatura blanca con unas extrañas figuras y letras que parecían tener un conjuro en ellas, consigo llevaba un bastón con una piedra que brillaba. En su cintura llevaba dos espadas de fuego negro. Tenía una cola blanca e intimidante y una capucha que oscurecía su cara. Era alto y fuerte, con múltiples hechizos que casi nadie conocía. Y siempre llevaba un cuchillo pequeño, con letras escritas y un color gris. Esta anómala criatura fue capturada en 1931, cuando estaba en su cueva con su padre, salió para buscar algo que cenar. Cuando salió, se encontró con algo similar a una criatura de su planeta y rápidamente se acercó hacia ella. Justo a punto de cazarla, él mismo cayó en su propia trampa y fue encerrado por redes y barras de metal. Su padre, cuando le pareció rara su tardanza, salió a buscarlo, y solo encontró su amuleto tirado junto con sangre en los alrededores. Unos años después, el SCP-1002 escapó y cuando encontró a su padre estaba muerto, no tenía alimento y murió en su búsqueda. Le recordó a su madre, la cual murió protegiéndolos de unos lobos hambrientos que entraron a su hogar.",
    containment: "El SCP-1002 debe ser contenido en una celda de 100x100 metros, con una altura de 5 metros. El SCP-1002 debe creer que se encuentra en un lugar natural y arbolado. La comida será proporcionada de una manera discreta, dejando a este SCP cazar.",
    image: "scp1002.jpg",
    procedures: "No se permite el contacto directo del personal con este SCP. Todo personal debe mantener una distancia mínima de seguridad de 50 metros. En caso de avistamiento fuera de su celda, activar inmediatamente el protocolo de contención Omega-7.",
    incidents: [
        {
            date: "██/██/1931",
            description: "Primera captura documentada del espécimen"
        },
        {
            date: "██/██/████",
            description: "Escape y posterior redescubrimiento de documentación por el Dr. Michael"
        }
    ]
}
];

const extendedUserData = {
    "investigador1": {
        fullName: "Dr. Sarah Thompson",
        specialization: "Contención Biológica",
        yearsOfService: 5,
        clearanceAreas: ["Sector-19", "Área-12"],
        history: [
            { date: "2023-01", event: "Promoción a Nivel 1" },
            { date: "2022-06", event: "Primera contención exitosa SCP-173" }
        ],
        status: "Activo",
        assignedSCPs: ["173", "049"]
    },
    // Add data for other users...
};

// Update the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (!currentUser && !window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
        return;
    }

    const path = window.location.pathname;
    let requiredLevel = 1;

    if (path.includes('scp-detail.html')) {
        displaySCPDetail();
        return;
    } else if (path.includes('personnel-detail.html')) {
        displayPersonnelDetail();
        return;
    }

    // Your existing level checks
    if (path.includes('personal.html')) requiredLevel = 1;
    else if (path.includes('locations.html')) requiredLevel = 2;
    else if (path.includes('reports.html')) requiredLevel = 1;
    else if (path.includes('scps.html')) requiredLevel = 1;

    if (parseInt(currentUser.level) < requiredLevel) {
        window.location.href = 'index.html';
        return;
    }

    setupLogout();
    updateUserInterface(currentUser);
    loadPageContent(currentUser);
});

function loadPageContent(currentUser) {
    const path = window.location.pathname;
    const restricted = document.querySelector('.restricted');
    
    if (restricted) {
        restricted.style.display = 'block';
    }
    if (currentUser.username === ADMIN_USERNAME) {
        showAdminPanel();
    }
    if (path.includes('personal.html')) {
        displayPersonnel(currentUser);
    } else if (path.includes('locations.html')) {
        displayLocations(currentUser);
    } else if (path.includes('reports.html')) {
        displayReports(currentUser);
    } else if (path.includes('scps.html')) {
        displaySCPsList(currentUser);
    } else if (path.includes('personnel-detail.html')) {
        displayPersonnelDetail();
    }
}


// Update the showAdminPanel function
function showAdminPanel() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser && currentUser.username === ADMIN_USERNAME) {
        const adminSection = `
            <div class="admin-panel">
                <h3>Panel de Control Administrativo</h3>
                <div class="admin-controls">
                    <button onclick="downloadLogs()">Descargar Registros</button>
                    <div id="logViewer">
                        <h4>Registro de Actividad:</h4>
                        <div id="recentLogs"></div>
                    </div>
                </div>
            </div>
        `;
        document.querySelector('.restricted').insertAdjacentHTML('beforebegin', adminSection);
    }
}

// Add this to ensure the panel appears
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser && currentUser.username === ADMIN_USERNAME) {
        showAdminPanel();
    }
});

function displayPersonnel(currentUser) {
    const usersList = document.getElementById('users-list');
    if (usersList) {
        usersList.innerHTML = '<h2>Lista de Personal</h2>';
        users.forEach(u => {
            const displayName = parseInt(u.level) > parseInt(currentUser.level) ? 
                '[REDACTADO]' : u.username;
            usersList.innerHTML += `
                <div class="personnel-card" onclick="window.location.href='personnel-detail.html?id=${u.username}'">
                    <h3>${displayName}</h3>
                    <p>Nivel de acceso: ${u.level}</p>
                    <div class="status-indicator ${u.level > currentUser.level ? 'standby' : 'active'}"></div>
                    <p class="read-more">Click para más detalles</p>
                </div>
            `;
        });
    }
}

function displayLocations(currentUser) {
    const locationsList = document.getElementById('locations-list');
    if (locationsList) {
        locationsList.innerHTML = '<h2>Ubicaciones Clasificadas</h2>';
        locations.forEach(loc => {
            if (parseInt(currentUser.level) >= parseInt(loc.level)) {
                locationsList.innerHTML += `
                    <div class="location-card">
                        <h3>${loc.name}</h3>
                        <p>${loc.description}</p>
                        <div class="status-indicator secure"></div>
                        <p class="access-level">Nivel ${loc.level}</p>
                    </div>
                `;
            }
        });
    }
}

function displayReports(currentUser) {
    const reportsList = document.getElementById('reports-list');
    if (reportsList) {
        reportsList.innerHTML = '<h3>Informes Clasificados</h3>';
        // Show all reports at or below user's level
        reports.forEach(report => {
            if (parseInt(currentUser.level) >= parseInt(report.level)) {
                reportsList.innerHTML += `
                    <div class="report-item">
                        <h4>${report.title}</h4>
                        <p>${report.description}</p>
                        <p>Fecha: ${report.date}</p>
                        <p>Nivel de acceso requerido: ${report.level}</p>
                    </div>
                `;
            } else {
                reportsList.innerHTML += `
                    <div class="report-item">
                        <h4>[INFORME REDACTADO]</h4>
                        <p>[CONTENIDO CLASIFICADO]</p>
                        <p>Nivel de acceso requerido: ${report.level}</p>
                    </div>
                `;
            }
        });
    }
}

function displaySCPsList(currentUser) {
    const scpList = document.getElementById('scp-list');
    if (scpList) {
        scpList.innerHTML = '<h3>Lista de SCPs</h3>';
        scps.forEach(scp => {
            if (parseInt(currentUser.level) >= parseInt(scp.level)) {
                scpList.innerHTML += `
                    <div class="scp-item" onclick="window.location.href='scp-detail.html?id=${scp.id}'">
                        <h4>SCP-${scp.id}</h4>
                        <p>Clase: ${scp.class}</p>
                        <p>${scp.preview}</p>
                        <p class="read-more">Click para más información</p>
                    </div>
                `;
            } else {
                scpList.innerHTML += `
                    <div class="scp-item">
                        <h4>SCP-${scp.id}</h4>
                        <p>Clase: ${scp.class}</p>
                        <p>[INFORMACIÓN CLASIFICADA - NIVEL ${scp.level} REQUERIDO]</p>
                        <p class="read-more">Acceso denegado</p>
                    </div>
                `;
            }
        });
    }
}

function displaySCPDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const scpId = urlParams.get('id');
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const scp = scps.find(s => s.id === scpId);
    const detailContainer = document.getElementById('scp-detail');
    
    // Clear check for access level
    if (scp && detailContainer) {
        const userLevel = parseInt(currentUser.level);
        const scpLevel = parseInt(scp.level);
        
        if (userLevel >= scpLevel) {
            detailContainer.innerHTML = `
                <div class="scp-content">
                    <div class="scp-header">
                        <h2>SCP-${scp.id}</h2>
                        <div class="danger-level">${scp.class}</div>
                    </div>
                    
                    <div class="scp-image">
                        <img src="images/${scp.image}" alt="SCP-${scp.id}">
                    </div>
                    
                    <div class="containment-procedures">
                        <h3>Procedimientos de Contención</h3>
                        <p>${scp.containment}</p>
                    </div>
                    
                    <div class="scp-stats">
                        <div class="stat-item">
                            <h4>Clase</h4>
                            <p>${scp.class}</p>
                        </div>
                        <div class="stat-item">
                            <h4>Nivel</h4>
                            <p>${scp.level}</p>
                        </div>
                    </div>
                    
                    <div class="scp-description">
                        <h3>Descripción</h3>
                        <p>${scp.fullDescription}</p>
                    </div>
                </div>
            `;
        } else {
            detailContainer.innerHTML = `
                <div class="access-denied">
                    <h2>ACCESO DENEGADO</h2>
                    <p>Se requiere nivel ${scp.level} para acceder a este contenido.</p>
                    <p>Su nivel actual es: ${userLevel}</p>
                </div>
            `;
        }
    }
}

function displayPersonnelDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const userData = extendedUserData[userId];
    const targetUser = users.find(u => u.username === userId);
    const detailContainer = document.getElementById('personnel-detail');
    
    if (userData && detailContainer && targetUser && 
        parseInt(currentUser.level) >= parseInt(targetUser.level)) {
        detailContainer.innerHTML = `
            <div class="personnel-content">
                <div class="personnel-header">
                    <h2>${userData.fullName}</h2>
                    <p class="designation">${userId}</p>
                </div>
                
                <div class="personnel-stats">
                    <div class="stat-item">
                        <h4>Especialización</h4>
                        <p>${userData.specialization}</p>
                    </div>
                    <div class="stat-item">
                        <h4>Años de Servicio</h4>
                        <p>${userData.yearsOfService}</p>
                    </div>
                    <div class="stat-item">
                        <h4>Estado</h4>
                        <p>${userData.status}</p>
                    </div>
                    <div class="stat-item">
                        <h4>Nivel de Acceso</h4>
                        <p>${targetUser.level}</p>
                    </div>
                </div>
                
                <div class="personnel-history">
                    <h3>Historial</h3>
                    ${userData.history.map(h => `
                        <div class="history-item">
                            <span class="history-date">${h.date}</span>
                            <span class="history-event">${h.event}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="clearance-areas">
                    <h3>Áreas Autorizadas</h3>
                    <div class="areas-grid">
                        ${userData.clearanceAreas.map(area => `
                            <div class="area-item">
                                <span class="area-name">${area}</span>
                                <div class="status-indicator active"></div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="assigned-scps">
                    <h3>SCPs Asignados</h3>
                    <div class="scps-grid">
                        ${userData.assignedSCPs.map(scp => `
                            <div class="assigned-scp-item" onclick="window.location.href='scp-detail.html?id=${scp}'">
                                <h4>SCP-${scp}</h4>
                                <p class="read-more">Ver detalles</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="additional-info">
                    <h3>Notas Adicionales</h3>
                    <p>${userData.notes || 'Sin notas adicionales.'}</p>
                </div>
            </div>
        `;
    } else {
        detailContainer.innerHTML = `
            <div class="access-denied">
                <h2>ACCESO DENEGADO</h2>
                <p>Se requiere nivel ${targetUser ? targetUser.level : '?'} para acceder a este contenido.</p>
                <p>Su nivel actual es: ${currentUser.level}</p>
                <button class="nav-button" onclick="window.location.href='personal.html'">Volver a Personal</button>
            </div>
        `;
    }
}

function updateUserInterface(user) {
    const nav = document.querySelector('.main-nav');
    const userInfo = document.createElement('div');
    userInfo.className = 'user-info';
    userInfo.innerHTML = `Nivel de acceso: ${user.level} | Usuario: ${user.username}`;
    nav.appendChild(userInfo);
}

function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }
}
