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
        name: "████████",
        class: "Apollyon",
        level: "5",
        preview: "Algunos lo describen como una criatura del inframundo, otros como un angel...",
        fullDescription: "El Scp 1002 “Oscuro Ángel” es una criatura paralela proveniente de otra dimension, cuya aparicion surgió despues de que un portal interdimensional se abriera en 	el norte. Dias despues de su cierre, se detectaron rasgos de inundaciones o avalanchas nunca antes vistas. Cuando empeoro todo, un equipo E-11 se dirigio hacia el lugar a hacer la 	expedicion. En la busqueda, se detectaron signos de vida cerca, ya que habian huellas tapadas por la nieve. Casi al limite de cancelar la busqueda, una avalancha cayó encima del 	escuadrón, un sonido extraño aullaba y parecia decir conjuros o algun tipo de magia. Las cámaras del escuadrón quedaron inutilizables por los golpes y no hubo ni rastros del 	escuadrón el cual desapareció despues de la avalancha. El Consejo estaba enfadado, era una amenaza grave, cuyo poder no puede pertenecer a este lugar. El caso quedó en busqueda 	durante un largo periodo. . . 2 Años despues. . . El Dr. Michael fue encomendado a buscar unos documentos de 999, cuando entro en una sala que nunca habia visto antes miró en el 	cajon clasificado en keter, y encontró unos papeles antiguos y arrugados. En esos documentos, habian evidencias de un Scp denominado 1002. Un hechicero o mago con mucho poder que 	supuestamente escapó de las instalaciones hace mucho tiempo. Su descripcion era tal que asi: Una criatura blanca con unas extrañas figuras y letras que parecian tener un conjuro en 	ellas, consigo llevaba un baston con una piedra que brillaba. En su cintura llevaba dos espadas de fuego negro. Tenia una cola blanca e intimidante y una capucha que oscurocia su 	cara. Era alto y fuerte, con multiples hechizos que casi nadie conocia. Y siempre llevaba un cuchillo pequeño, con letras escritas y un color gris. Esta anomala criatura fue 	capturada en 1931, cuando estaba en su cueva con su padre, salio para buscar algo que cenar. Cuando salio, se encontro con algo similar a una criatura de su planeta y rapidamente 	se acerco hacia ella. Justo apunto de cazarla, el mismo cayo en su propia trampa y fue encerrado por redes y barras de metal. Su padre, cuando le parecio raro su tardanza, salio a 	buscarlo, y solo encontro su amuleto tirado junto con sangre en los alrededores. Unos años despues, el scp 1002 escapo y cuando encontro a su padre estaba muerto, no tenia alimento 	y murio en su busqueda. Le recordo a su madre, la cual murio protegiondolos de unos lobos hambrientos que entraron a su hogar.",
        containment: "El SCP-1002 debe ser contenido en una celda de 100x100 metros, con una altura de 5 metros. El SCP-1002 debé creer que se encuentra en un lugar natural y arbolado.
	La comida será proporcionada de una manera discreta, dejando a este SCP cazar.",
        image: "scp1002.jpg",
        procedures: "No se permite el contacto directo del personal con este SCP.",
        incidents: [
            {
                date: "██/██/████",
                description: "████████████████████████████████████"
            }
        ]
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    const path = window.location.pathname;
    let requiredLevel = 1;

    // Adjust required levels - remove the high requirements
    if (path.includes('personal.html')) requiredLevel = 1; // Changed from 6
    else if (path.includes('locations.html')) requiredLevel = 2;
    else if (path.includes('reports.html')) requiredLevel = 1; // Changed from 3
    else if (path.includes('scps.html')) requiredLevel = 1;

    // Only redirect if trying to access a completely restricted area
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

    if (path.includes('personal.html')) {
        displayPersonnel(currentUser);
    } else if (path.includes('locations.html')) {
        displayLocations(currentUser);
    } else if (path.includes('reports.html')) {
        displayReports(currentUser);
    } else if (path.includes('scps.html')) {
        displaySCPsList(currentUser);
    }
}

function displayPersonnel(currentUser) {
    const usersList = document.getElementById('users-list');
    if (usersList) {
        usersList.innerHTML = '<h3>Lista de Personal</h3>';
        // Show all users, but redact those with higher level
        users.forEach(u => {
            const displayName = parseInt(u.level) > parseInt(currentUser.level) ? 
                '[REDACTADO]' : u.username;
            usersList.innerHTML += `
                <div class="user-item">
                    <p>Usuario: ${displayName}</p>
                    <p>Nivel de acceso: ${u.level}</p>
                </div>
            `;
        });
    }
}

function displayLocations(currentUser) {
    const locationsList = document.getElementById('locations-list');
    if (locationsList) {
        locationsList.innerHTML = '<h3>Ubicaciones Clasificadas</h3>';
        locations.forEach(loc => {
            if (parseInt(currentUser.level) >= parseInt(loc.level)) {
                locationsList.innerHTML += `
                    <div class="location-item">
                        <h4>${loc.name}</h4>
                        <p>${loc.description}</p>
                        <p>Nivel de acceso requerido: ${loc.level}</p>
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
    
    if (scp && detailContainer && parseInt(currentUser.level) >= parseInt(scp.level)) {
        detailContainer.innerHTML = `
            <div class="scp-full-detail">
                <h2>SCP-${scp.id}</h2>
                <div class="scp-image">
                    <img src="images/${scp.image}" alt="SCP-${scp.id}">
                </div>
                <div class="scp-info">
                    <h3>Clase: ${scp.class}</h3>
                    <div class="section">
                        <h4>Descripción</h4>
                        <p>${scp.fullDescription}</p>
                    </div>
                    <div class="section">
                        <h4>Procedimientos de Contención</h4>
                        <p>${scp.containment}</p>
                    </div>
                    <div class="section">
                        <h4>Procedimientos Especiales</h4>
                        <p>${scp.procedures}</p>
                    </div>
                    <div class="section">
                        <h4>Registro de Incidentes</h4>
                        ${scp.incidents.map(incident => `
                            <div class="incident">
                                <p>Fecha: ${incident.date}</p>
                                <p>${incident.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
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
