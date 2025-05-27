class NoteItem extends HTMLElement {
  constructor() {
    super();
    this._note = null;
  }

  connectedCallback() {
    try {
      this._note = JSON.parse(this.getAttribute('note-data'));
      this._render();
      this._setupEventListeners();
    } catch (error) {
      console.error('Error parsing note data:', error);
      this._renderError();
    }
  }

  _render() {
    if (!this._note) return this._renderError();
    
    const { id, title, body, createdAt, archived } = this._note;
    
    this.innerHTML = `
      <div class="note-card">
        <h3 class="note-title">${this._escapeHtml(title)}</h3>
        <p class="note-body">${this._escapeHtml(body)}</p>
        <div class="note-date">
          📅 ${this._formatDate(createdAt)}
          ${archived ? ' • 📦 Diarsipkan' : ''}
        </div>
        <div class="note-actions">
          ${archived ? 
            `<button class="btn-action btn-unarchive" data-id="${id}">Batal Arsip</button>` :
            `<button class="btn-action btn-archive" data-id="${id}">Arsipkan</button>`
          }
          <button class="btn-action btn-delete" data-id="${id}">Hapus</button>
        </div>
      </div>
    `;
  }

  _renderError() {
    this.innerHTML = `
      <div class="note-card error">
        <h3 class="note-title">Error</h3>
        <p class="note-body">Terjadi kesalahan saat memuat catatan.</p>
      </div>
    `;
  }

  _setupEventListeners() {
    const archiveButton = this.querySelector('.btn-archive');
    const unarchiveButton = this.querySelector('.btn-unarchive');
    const deleteButton = this.querySelector('.btn-delete');
    
    if (archiveButton) {
      archiveButton.addEventListener('click', () => {
        const noteId = archiveButton.dataset.id;
        
        // Dispatch an event to archive the note
        const archiveEvent = new CustomEvent('note:archive', {
          bubbles: true,
          detail: { id: noteId }
        });
        
        this.dispatchEvent(archiveEvent);
      });
    }
    
    if (unarchiveButton) {
      unarchiveButton.addEventListener('click', () => {
        const noteId = unarchiveButton.dataset.id;
        
        // Dispatch an event to unarchive the note
        const unarchiveEvent = new CustomEvent('note:unarchive', {
          bubbles: true,
          detail: { id: noteId }
        });
        
        this.dispatchEvent(unarchiveEvent);
      });
    }
    
    if (deleteButton) {
      deleteButton.addEventListener('click', () => {
        const noteId = deleteButton.dataset.id;
        
        // Dispatch an event to delete the note
        const deleteEvent = new CustomEvent('note:delete', {
          bubbles: true,
          detail: { id: noteId }
        });
        
        this.dispatchEvent(deleteEvent);
      });
    }
  }

  _escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  _formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('id-ID', options);
  }
}

customElements.define('note-item', NoteItem);