// Web Component 3: Note Item
class NoteItem extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const noteData = JSON.parse(this.getAttribute('note-data'));
        const isArchived = noteData.archived;
        
        this.innerHTML = `
            <div class="note-card">
                <h3 class="note-title">${this.escapeHtml(noteData.title)}</h3>
                <p class="note-body">${this.escapeHtml(noteData.body)}</p>
                <div class="note-date">
                    📅 ${this.formatDate(noteData.createdAt)}
                    ${isArchived ? ' • 📦 Diarsipkan' : ''}
                </div>
                <div class="note-actions">
                    ${isArchived ? 
                        '<button class="btn-action btn-unarchive" onclick="unarchiveNote(\'' + noteData.id + '\')">Batal Arsip</button>' :
                        '<button class="btn-action btn-archive" onclick="archiveNote(\'' + noteData.id + '\')">Arsipkan</button>'
                    }
                    <button class="btn-action btn-delete" onclick="deleteNote('${noteData.id}')">Hapus</button>
                </div>
            </div>
        `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatDate(dateString) {
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

// Register component
customElements.define('note-item', NoteItem);