// File: app.js (diletakkan di root folder, bukan di js/)
// Notes App Logic dengan akses data melalui window object

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

        // Cek apakah data sudah tersedia
        if (!window.notesData) {
            console.error('Notes data not loaded!');
            return;
        }

        console.log('✅ App initialized with', window.notesData.length, 'notes');
        
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
        if (!this.notesGrid || !window.notesData) return;
        
        var activeNotes = window.notesData.filter(function(note) {
            return !note.archived;
        });
        
        if (activeNotes.length === 0) {
            this.notesGrid.innerHTML = `
                <div class="empty-state">
                    <h3>📝 Belum ada catatan aktif</h3>
                    <p>Tambahkan catatan pertama Anda menggunakan formulir di atas!</p>
                </div>
            `;
            return;
        }

        var notesHTML = '';
        for (var i = 0; i < activeNotes.length; i++) {
            var note = activeNotes[i];
            var noteDataJson = JSON.stringify(note).replace(/'/g, '&apos;');
            notesHTML += '<note-item note-data=\'' + noteDataJson + '\'></note-item>';
        }
        this.notesGrid.innerHTML = notesHTML;
    }

    renderArchivedNotes() {
        if (!this.archiveGrid || !window.notesData) return;
        
        var archivedNotes = window.notesData.filter(function(note) {
            return note.archived;
        });
        
        if (archivedNotes.length === 0) {
            this.archiveGrid.innerHTML = `
                <div class="empty-state">
                    <h3>📦 Belum ada catatan diarsipkan</h3>
                    <p>Catatan yang diarsipkan akan muncul di sini</p>
                </div>
            `;
            return;
        }

        var notesHTML = '';
        for (var i = 0; i < archivedNotes.length; i++) {
            var note = archivedNotes[i];
            var noteDataJson = JSON.stringify(note).replace(/'/g, '&apos;');
            notesHTML += '<note-item note-data=\'' + noteDataJson + '\'></note-item>';
        }
        this.archiveGrid.innerHTML = notesHTML;
    }
}

// Global Functions
function archiveNote(noteId) {
    try {
        if (!window.notesData) {
            console.error('Notes data not available');
            return;
        }
        
        for (var i = 0; i < window.notesData.length; i++) {
            if (window.notesData[i].id === noteId) {
                window.notesData[i].archived = true;
                break;
            }
        }
        
        if (window.notesApp) {
            window.notesApp.renderAllNotes();
        }
    } catch (error) {
        console.error('Error archiving note:', error);
    }
}

function unarchiveNote(noteId) {
    try {
        if (!window.notesData) {
            console.error('Notes data not available');
            return;
        }
        
        for (var i = 0; i < window.notesData.length; i++) {
            if (window.notesData[i].id === noteId) {
                window.notesData[i].archived = false;
                break;
            }
        }
        
        if (window.notesApp) {
            window.notesApp.renderAllNotes();
        }
    } catch (error) {
        console.error('Error unarchiving note:', error);
    }
}

function deleteNote(noteId) {
    try {
        if (confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
            if (!window.notesData) {
                console.error('Notes data not available');
                return;
            }
            
            for (var i = 0; i < window.notesData.length; i++) {
                if (window.notesData[i].id === noteId) {
                    window.notesData.splice(i, 1);
                    break;
                }
            }
            
            if (window.notesApp) {
                window.notesApp.renderAllNotes();
            }
        }
    } catch (error) {
        console.error('Error deleting note:', error);
    }
}

function toggleArchive() {
    try {
        var archivedSection = document.getElementById('archivedNotes');
        var button = document.querySelector('.archive-toggle');
        
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

// Function to add new note
function addNewNote(title, body) {
    try {
        if (!window.notesData) {
            window.notesData = [];
        }
        
        var newNote = {
            id: 'notes-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
            title: title,
            body: body,
            createdAt: new Date().toISOString(),
            archived: false
        };

        window.notesData.unshift(newNote);
        
        if (window.notesApp) {
            window.notesApp.renderAllNotes();
        }
        
        return true;
    } catch (error) {
        console.error('Error adding note:', error);
        return false;
    }
}

// Initialize App
var notesApp;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded, initializing app...');
    
    // Tunggu sebentar untuk memastikan semua script ter-load
    setTimeout(function() {
        notesApp = new NotesApp();
        window.notesApp = notesApp;
        notesApp.init();
    }, 200);
});

// Fallback jika DOMContentLoaded sudah fired
if (document.readyState === 'loading') {
    // DOM belum siap, tunggu event
} else {
    // DOM sudah siap
    setTimeout(function() {
        if (!notesApp) {
            console.log('🔄 Fallback initialization...');
            notesApp = new NotesApp();
            window.notesApp = notesApp;
            notesApp.init();
        }
    }, 200);
}