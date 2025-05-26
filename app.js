// Notes App Logic
class NotesApp {
    constructor() {
        this.notesGrid = null;
        this.archiveGrid = null;
    }

    init() {
        // Pastikan DOM sudah siap
        this.notesGrid = document.getElementById('notesGrid');
        this.archiveGrid = document.getElementById('archiveGrid');
        
        if (!this.notesGrid || !this.archiveGrid) {
            console.error('Grid elements not found!');
            return;
        }

        // Render notes tanpa delay
        this.renderAllNotes();
    }

    renderAllNotes() {
        try {
            this.renderActiveNotes();
            this.renderArchivedNotes();
        } catch (error) {
            console.error('Error rendering notes:', error);
        }
    }

    renderActiveNotes() {
        if (!this.notesGrid) return;
        
        const activeNotes = notesData.filter(note => !note.archived);
        
        if (activeNotes.length === 0) {
            this.notesGrid.innerHTML = `
                <div class="empty-state">
                    <h3>📝 Belum ada catatan aktif</h3>
                    <p>Tambahkan catatan pertama Anda menggunakan formulir di atas!</p>
                </div>
            `;
            return;
        }

        this.notesGrid.innerHTML = activeNotes.map(note => {
            // Escape JSON untuk menghindari error
            const noteDataJson = JSON.stringify(note).replace(/'/g, '&apos;');
            return `<note-item note-data='${noteDataJson}'></note-item>`;
        }).join('');
    }

    renderArchivedNotes() {
        if (!this.archiveGrid) return;
        
        const archivedNotes = notesData.filter(note => note.archived);
        
        if (archivedNotes.length === 0) {
            this.archiveGrid.innerHTML = `
                <div class="empty-state">
                    <h3>📦 Belum ada catatan diarsipkan</h3>
                    <p>Catatan yang diarsipkan akan muncul di sini</p>
                </div>
            `;
            return;
        }

        this.archiveGrid.innerHTML = archivedNotes.map(note => {
            const noteDataJson = JSON.stringify(note).replace(/'/g, '&apos;');
            return `<note-item note-data='${noteDataJson}'></note-item>`;
        }).join('');
    }
}

// Global Functions
function archiveNote(noteId) {
    try {
        const noteIndex = notesData.findIndex(note => note.id === noteId);
        if (noteIndex !== -1) {
            notesData[noteIndex].archived = true;
            if (window.notesApp) {
                window.notesApp.renderAllNotes();
            }
        }
    } catch (error) {
        console.error('Error archiving note:', error);
    }
}

function unarchiveNote(noteId) {
    try {
        const noteIndex = notesData.findIndex(note => note.id === noteId);
        if (noteIndex !== -1) {
            notesData[noteIndex].archived = false;
            if (window.notesApp) {
                window.notesApp.renderAllNotes();
            }
        }
    } catch (error) {
        console.error('Error unarchiving note:', error);
    }
}

function deleteNote(noteId) {
    try {
        if (confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
            const noteIndex = notesData.findIndex(note => note.id === noteId);
            if (noteIndex !== -1) {
                notesData.splice(noteIndex, 1);
                if (window.notesApp) {
                    window.notesApp.renderAllNotes();
                }
            }
        }
    } catch (error) {
        console.error('Error deleting note:', error);
    }
}

function toggleArchive() {
    try {
        const archivedSection = document.getElementById('archivedNotes');
        const button = document.querySelector('.archive-toggle');
        
        if (!archivedSection || !button) return;
        
        if (archivedSection.classList.contains('show')) {
            archivedSection.classList.remove('show');
            button.innerHTML = '📦 Lihat Catatan Arsip';
        } else {
            archivedSection.classList.add('show');
            button.innerHTML = '🔼 Sembunyikan Catatan Arsip';
        }
    } catch (error) {
        console.error('Error toggling archive:', error);
    }
}

// Initialize App
let notesApp;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Tunggu semua Web Components terdaftar
    setTimeout(() => {
        notesApp = new NotesApp();
        window.notesApp = notesApp; // Make globally accessible
        notesApp.init();
    }, 100);
});

// Fallback jika DOMContentLoaded sudah fired
if (document.readyState === 'loading') {
    // DOM belum siap, tunggu event
} else {
    // DOM sudah siap
    setTimeout(() => {
        if (!notesApp) {
            notesApp = new NotesApp();
            window.notesApp = notesApp;
            notesApp.init();
        }
    }, 100);
}