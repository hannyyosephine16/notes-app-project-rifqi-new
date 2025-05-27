class AppHeader extends HTMLElement {
  constructor() {
    super();
    this._appName = '';
    this._description = '';
  }

  connectedCallback() {
    this._appName = this.getAttribute('app-name') || 'Notes App';
    this._description = this.getAttribute('description') || 'Aplikasi pencatatan sederhana dan elegan';
    
    this._render();
  }

  _render() {
    this.innerHTML = `
      <header class="header">
        <h1>✨ ${this._appName}</h1>
        <p>${this._description}</p>
      </header>
    `;
  }
}

customElements.define('app-header', AppHeader);