// // File: app.js (diletakkan di root folder, bukan di js/)
// // Notes App Logic dengan akses data melalui window object

// class NotesApp {
//     constructor() {
//         this.notesGrid = null;
//         this.archiveGrid = null;
//     }

//     init() {
//         // Pastikan DOM sudah siap
//         this.notesGrid = document.getElementById('notesGrid');
//         this.archiveGrid = document.getElementById('archiveGrid');
        
//         if (!this.notesGrid || !this.archiveGrid) {
//             console.error('Grid elements not found!');
//             return;
//         }

//         // Cek apakah data sudah tersedia
//         if (!window.notesData) {
//             console.error('Notes data not loaded!');
//             return;
//         }

//         console.log('✅ App initialized with', window.notesData.length, 'notes');
        
//         // Render notes tanpa delay
//         this.renderAllNotes();
//     }

//     renderAllNotes() {
//         try {
//             this.renderActiveNotes();
//             this.renderArchivedNotes();
//         } catch (error) {
//             console.error('Error rendering notes:', error);
//         }
//     }

//     renderActiveNotes() {
//         if (!this.notesGrid || !window.notesData) return;
        
//         var activeNotes = window.notesData.filter(function(note) {
//             return !note.archived;
//         });
        
//         if (activeNotes.length === 0) {
//             this.notesGrid.innerHTML = `
//                 <div class="empty-state">
//                     <h3>📝 Belum ada catatan aktif</h3>
//                     <p>Tambahkan catatan pertama Anda menggunakan formulir di atas!</p>
//                 </div>
//             `;
//             return;
//         }

//         var notesHTML = '';
//         for (var i = 0; i < activeNotes.length; i++) {
//             var note = activeNotes[i];
//             var noteDataJson = JSON.stringify(note).replace(/'/g, '&apos;');
//             notesHTML += '<note-item note-data=\'' + noteDataJson + '\'></note-item>';
//         }
//         this.notesGrid.innerHTML = notesHTML;
//     }

//     renderArchivedNotes() {
//         if (!this.archiveGrid || !window.notesData) return;
        
//         var archivedNotes = window.notesData.filter(function(note) {
//             return note.archived;
//         });
        
//         if (archivedNotes.length === 0) {
//             this.archiveGrid.innerHTML = `
//                 <div class="empty-state">
//                     <h3>📦 Belum ada catatan diarsipkan</h3>
//                     <p>Catatan yang diarsipkan akan muncul di sini</p>
//                 </div>
//             `;
//             return;
//         }

//         var notesHTML = '';
//         for (var i = 0; i < archivedNotes.length; i++) {
//             var note = archivedNotes[i];
//             var noteDataJson = JSON.stringify(note).replace(/'/g, '&apos;');
//             notesHTML += '<note-item note-data=\'' + noteDataJson + '\'></note-item>';
//         }
//         this.archiveGrid.innerHTML = notesHTML;
//     }
// }

// // Global Functions
// function archiveNote(noteId) {
//     try {
//         if (!window.notesData) {
//             console.error('Notes data not available');
//             return;
//         }
        
//         for (var i = 0; i < window.notesData.length; i++) {
//             if (window.notesData[i].id === noteId) {
//                 window.notesData[i].archived = true;
//                 break;
//             }
//         }
        
//         if (window.notesApp) {
//             window.notesApp.renderAllNotes();
//         }
//     } catch (error) {
//         console.error('Error archiving note:', error);
//     }
// }

// function unarchiveNote(noteId) {
//     try {
//         if (!window.notesData) {
//             console.error('Notes data not available');
//             return;
//         }
        
//         for (var i = 0; i < window.notesData.length; i++) {
//             if (window.notesData[i].id === noteId) {
//                 window.notesData[i].archived = false;
//                 break;
//             }
//         }
        
//         if (window.notesApp) {
//             window.notesApp.renderAllNotes();
//         }
//     } catch (error) {
//         console.error('Error unarchiving note:', error);
//     }
// }

// function deleteNote(noteId) {
//     try {
//         if (confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
//             if (!window.notesData) {
//                 console.error('Notes data not available');
//                 return;
//             }
            
//             for (var i = 0; i < window.notesData.length; i++) {
//                 if (window.notesData[i].id === noteId) {
//                     window.notesData.splice(i, 1);
//                     break;
//                 }
//             }
            
//             if (window.notesApp) {
//                 window.notesApp.renderAllNotes();
//             }
//         }
//     } catch (error) {
//         console.error('Error deleting note:', error);
//     }
// }

// function toggleArchive() {
//     try {
//         var archivedSection = document.getElementById('archivedNotes');
//         var button = document.querySelector('.archive-toggle');
        
//         if (!archivedSection || !button) return;
        
//         if (archivedSection.classList.contains('show')) {
//             archivedSection.classList.remove('show');
//             button.innerHTML = '📦 Lihat Catatan Arsip';
//         } else {
//             archivedSection.classList.add('show');
//             button.innerHTML = '🔼 Sembunyikan Catatan Arsip';
//         }
//     } catch (error) {
//         console.error('Error toggling archive:', error);
//     }
// }

// // Function to add new note
// function addNewNote(title, body) {
//     try {
//         if (!window.notesData) {
//             window.notesData = [];
//         }
        
//         var newNote = {
//             id: 'notes-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
//             title: title,
//             body: body,
//             createdAt: new Date().toISOString(),
//             archived: false
//         };

//         window.notesData.unshift(newNote);
        
//         if (window.notesApp) {
//             window.notesApp.renderAllNotes();
//         }
        
//         return true;
//     } catch (error) {
//         console.error('Error adding note:', error);
//         return false;
//     }
// }

// // Initialize App
// var notesApp;

// // Wait for DOM to be fully loaded
// document.addEventListener('DOMContentLoaded', function() {
//     console.log('🚀 DOM loaded, initializing app...');
    
//     // Tunggu sebentar untuk memastikan semua script ter-load
//     setTimeout(function() {
//         notesApp = new NotesApp();
//         window.notesApp = notesApp;
//         notesApp.init();
//     }, 200);
// });

// // Fallback jika DOMContentLoaded sudah fired
// if (document.readyState === 'loading') {
//     // DOM belum siap, tunggu event
// } else {
//     // DOM sudah siap
//     setTimeout(function() {
//         if (!notesApp) {
//             console.log('🔄 Fallback initialization...');
//             notesApp = new NotesApp();
//             window.notesApp = notesApp;
//             notesApp.init();
//         }
//     }, 200);
// }

import './styles/styles.css';
import './components/app-header.js';
import './components/note-form.js';
import './components/note-item.js';
import './components/loading-indicator.js';
import ApiService from './services/api-service';
import NotificationService from './components/toast-notification';

class NotesApp {
  constructor() {
    this.notesGrid = null;
    this.archiveGrid = null;
    this.loadingIndicator = null;
    this.activeNotes = [];
    this.archivedNotes = [];
  }

  async init() {
    // Get DOM elements
    this.notesGrid = document.getElementById('notesGrid');
    this.archiveGrid = document.getElementById('archiveGrid');
    this.loadingIndicator = document.querySelector('loading-indicator');
    
    if (!this.notesGrid || !this.archiveGrid || !this.loadingIndicator) {
      console.error('Required elements not found!');
      return;
    }

    // Set up event listeners for the form
    this._setupEventListeners();
    
    // Fetch data from API
    await this._fetchNotes();
    
    console.log('✅ App initialized with notes data');
  }

  _setupEventListeners() {
    // Global event listener for note actions
    document.addEventListener('note:archive', event => this._archiveNote(event.detail.id));
    document.addEventListener('note:unarchive', event => this._unarchiveNote(event.detail.id));
    document.addEventListener('note:delete', event => this._deleteNote(event.detail.id));
    document.addEventListener('note:add', event => this._addNote(event.detail.title, event.detail.body));
    
    // Archive section toggle
    const archiveToggleBtn = document.querySelector('.archive-toggle');
    if (archiveToggleBtn) {
      archiveToggleBtn.addEventListener('click', () => this._toggleArchiveSection());
    }
  }

  async _fetchNotes() {
    try {
      this.loadingIndicator.show = true;
      
      // Fetch both active and archived notes in parallel
      const [activeNotes, archivedNotes] = await Promise.all([
        ApiService.getNotes(),
        ApiService.getArchivedNotes()
      ]);
      
      this.activeNotes = activeNotes;
      this.archivedNotes = archivedNotes;
      
      this._renderActiveNotes();
      this._renderArchivedNotes();
      
      NotificationService.success('Data berhasil dimuat');
    } catch (error) {
      console.error('Error fetching notes:', error);
      NotificationService.error('Gagal memuat data');
    } finally {
      this.loadingIndicator.show = false;
    }
  }

  _renderActiveNotes() {
    if (!this.notesGrid) return;
    
    if (this.activeNotes.length === 0) {
      this.notesGrid.innerHTML = `
        <div class="empty-state">
          <h3>📝 Belum ada catatan aktif</h3>
          <p>Tambahkan catatan pertama Anda menggunakan formulir di atas!</p>
        </div>
      `;
      return;
    }

    const notesHTML = this.activeNotes.map(note => {
      const noteDataJson = JSON.stringify(note).replace(/'/g, '&apos;');
      return `<note-item note-data='${noteDataJson}'></note-item>`;
    }).join('');
    
    this.notesGrid.innerHTML = notesHTML;
  }

  _renderArchivedNotes() {
    if (!this.archiveGrid) return;
    
    if (this.archivedNotes.length === 0) {
      this.archiveGrid.innerHTML = `
        <div class="empty-state">
          <h3>📦 Belum ada catatan diarsipkan</h3>
          <p>Catatan yang diarsipkan akan muncul di sini</p>
        </div>
      `;
      return;
    }

    const notesHTML = this.archivedNotes.map(note => {
      const noteDataJson = JSON.stringify(note).replace(/'/g, '&apos;');
      return `<note-item note-data='${noteDataJson}'></note-item>`;
    }).join('');
    
    this.archiveGrid.innerHTML = notesHTML;
  }

  async _addNote(title, body) {
    try {
      this.loadingIndicator.show = true;
      
      const newNote = await ApiService.createNote(title, body);
      
      // Add to active notes and re-render
      this.activeNotes.unshift(newNote);
      this._renderActiveNotes();
      
      NotificationService.success('Catatan berhasil ditambahkan');
      return true;
    } catch (error) {
      console.error('Error adding note:', error);
      NotificationService.error('Gagal menambahkan catatan');
      return false;
    } finally {
      this.loadingIndicator.show = false;
    }
  }

  async _archiveNote(noteId) {
    try {
      this.loadingIndicator.show = true;
      
      await ApiService.archiveNote(noteId);
      
      // Find the note in active notes
      const noteIndex = this.activeNotes.findIndex(note => note.id === noteId);
      if (noteIndex !== -1) {
        // Move note from active to archived
        const note = { ...this.activeNotes[noteIndex], archived: true };
        this.activeNotes.splice(noteIndex, 1);
        this.archivedNotes.unshift(note);
        
        // Re-render both sections
        this._renderActiveNotes();
        this._renderArchivedNotes();
        
        NotificationService.success('Catatan berhasil diarsipkan');
      }
    } catch (error) {
      console.error('Error archiving note:', error);
      NotificationService.error('Gagal mengarsipkan catatan');
    } finally {
      this.loadingIndicator.show = false;
    }
  }

  async _unarchiveNote(noteId) {
    try {
      this.loadingIndicator.show = true;
      
      await ApiService.unarchiveNote(noteId);
      
      // Find the note in archived notes
      const noteIndex = this.archivedNotes.findIndex(note => note.id === noteId);
      if (noteIndex !== -1) {
        // Move note from archived to active
        const note = { ...this.archivedNotes[noteIndex], archived: false };
        this.archivedNotes.splice(noteIndex, 1);
        this.activeNotes.unshift(note);
        
        // Re-render both sections
        this._renderActiveNotes();
        this._renderArchivedNotes();
        
        NotificationService.success('Catatan berhasil dipulihkan dari arsip');
      }
    } catch (error) {
      console.error('Error unarchiving note:', error);
      NotificationService.error('Gagal memulihkan catatan dari arsip');
    } finally {
      this.loadingIndicator.show = false;
    }
  }

  async _deleteNote(noteId) {
    try {
      const result = await NotificationService.confirm('Apakah Anda yakin?', 'Catatan yang dihapus tidak dapat dikembalikan!');
      
      if (!result.isConfirmed) return;
      
      this.loadingIndicator.show = true;
      
      await ApiService.deleteNote(noteId);
      
      // Remove from both active and archived notes
      this.activeNotes = this.activeNotes.filter(note => note.id !== noteId);
      this.archivedNotes = this.archivedNotes.filter(note => note.id !== noteId);
      
      // Re-render both sections
      this._renderActiveNotes();
      this._renderArchivedNotes();
      
      NotificationService.success('Catatan berhasil dihapus');
    } catch (error) {
      console.error('Error deleting note:', error);
      NotificationService.error('Gagal menghapus catatan');
    } finally {
      this.loadingIndicator.show = false;
    }
  }

  _toggleArchiveSection() {
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
  }
}

// Initialize App when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 DOM loaded, initializing app...');
  const notesApp = new NotesApp();
  window.notesApp = notesApp; // For debugging purposes
  notesApp.init();
});