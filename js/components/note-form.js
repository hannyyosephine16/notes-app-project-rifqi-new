// File: js/components/note-form.js
// Web Component 2: Note Form - Fixed Version

class NoteForm extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        var formTitle = this.getAttribute('form-title') || 'Tambah Catatan Baru';
        
        this.innerHTML = `
            <div class="form-container">
                <h2>${formTitle}</h2>
                <form id="noteForm">
                    <div class="form-group">
                        <label for="noteTitle">Judul Catatan</label>
                        <input type="text" id="noteTitle" name="title" placeholder="Masukkan judul catatan..." required>
                        <div class="error-message">Judul catatan tidak boleh kosong dan minimal 3 karakter</div>
                    </div>
                    <div class="form-group">
                        <label for="noteBody">Isi Catatan</label>
                        <textarea id="noteBody" name="body" placeholder="Tulis isi catatan di sini..." required></textarea>
                        <div class="error-message">Isi catatan tidak boleh kosong dan minimal 10 karakter</div>
                    </div>
                    <button type="submit" class="btn-submit">Tambah Catatan</button>
                </form>
            </div>
        `;

        this.setupFormValidation();
    }

    setupFormValidation() {
        var form = this.querySelector('#noteForm');
        var titleInput = this.querySelector('#noteTitle');
        var bodyInput = this.querySelector('#noteBody');
        var self = this;

        if (!form || !titleInput || !bodyInput) return;

        // Real-time validation
        titleInput.addEventListener('input', function() {
            self.validateField(titleInput, 3);
        });
        
        bodyInput.addEventListener('input', function() {
            self.validateField(bodyInput, 10);
        });
        
        titleInput.addEventListener('blur', function() {
            self.validateField(titleInput, 3);
        });
        
        bodyInput.addEventListener('blur', function() {
            self.validateField(bodyInput, 10);
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var isTitleValid = self.validateField(titleInput, 3);
            var isBodyValid = self.validateField(bodyInput, 10);
            
            if (isTitleValid && isBodyValid) {
                self.addNote(titleInput.value.trim(), bodyInput.value.trim());
                form.reset();
                self.clearValidationErrors();
            }
        });
    }

    validateField(input, minLength) {
        var formGroup = input.closest('.form-group');
        var value = input.value.trim();
        
        if (value.length === 0 || value.length < minLength) {
            formGroup.classList.add('error');
            return false;
        } else {
            formGroup.classList.remove('error');
            return true;
        }
    }

    clearValidationErrors() {
        var formGroups = this.querySelectorAll('.form-group');
        for (var i = 0; i < formGroups.length; i++) {
            formGroups[i].classList.remove('error');
        }
    }

    addNote(title, body) {
        try {
            // Gunakan function global untuk menambah note
            var success = addNewNote(title, body);
            
            if (success) {
                // Success feedback
                var button = this.querySelector('.btn-submit');
                if (button) {
                    var originalText = button.textContent;
                    button.textContent = 'Catatan Berhasil Ditambahkan! ✓';
                    button.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
                    
                    setTimeout(function() {
                        button.textContent = originalText;
                        button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    }, 2000);
                }
            }
        } catch (error) {
            console.error('Error adding note:', error);
        }
    }
}

// Register component
customElements.define('note-form', NoteForm);