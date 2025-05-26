// Web Component 1: App Header
class AppHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const appName = this.getAttribute('app-name') || 'Notes App';
        const description = this.getAttribute('description') || 'Aplikasi pencatatan sederhana dan elegan';
        
        this.innerHTML = `
            <header class="header">
                <h1>✨ ${appName}</h1>
                <p>${description}</p>
            </header>
        `;
    }
}

// Register component
customElements.define('app-header', AppHeader);