// Verificar acceso en páginas protegidas
function checkAccess() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const restrictedElements = document.querySelectorAll('.restricted');
    
    if (!currentUser) {
        // Redirigir a login si no hay sesión
        window.location.href = 'login.html';
        return;
    }
    
    // Mostrar/ocultar elementos según nivel de acceso
    restrictedElements.forEach(element => {
        const requiredLevel = element.dataset.level;
        if (parseInt(currentUser.level) >= parseInt(requiredLevel)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}
