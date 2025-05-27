class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this._show = false;
  }

  connectedCallback() {
    this._render();
  }

  set show(value) {
    this._show = value;
    this._render();
  }

  _render() {
    this.innerHTML = `
      <div class="loading-container ${this._show ? 'show' : 'hide'}">
        <div class="loading-overlay"></div>
        <div class="loading-content">
          <div class="spinner"></div>
          <p>Memuat...</p>
        </div>
      </div>
    `;
  }
}

customElements.define('loading-indicator', LoadingIndicator);

export default LoadingIndicator;