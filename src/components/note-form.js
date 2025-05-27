class NoteForm extends HTMLElement {
  constructor() {
    super();
    this._formTitle = '';
  }

  connectedCallback() {
    this._formTitle = this.getAttribute('form-title') || 'Tambah Catatan Baru';
    
    this._render();
    this._setupFormValidation();
  }

  _render() {
    this.innerHTML = `
      <div class="form-container">
        <h2>${this._formTitle}</h2>
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
  }

  _setupFormValidation() {
    const form = this.querySelector('#noteForm');
    const titleInput = this.querySelector('#noteTitle');
    const bodyInput = this.querySelector('#noteBody');
    
    if (!form || !titleInput || !bodyInput) return;

    // Real-time validation
    titleInput.addEventListener('input', () => {
      this._validateField(titleInput, 3);
    });
    
    bodyInput.addEventListener('input', () => {
      this._validateField(bodyInput, 10);
    });
    
    titleInput.addEventListener('blur', () => {
      this._validateField(titleInput, 3);
    });
    
    bodyInput.addEventListener('blur', () => {
      this._validateField(bodyInput, 10);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const isTitleValid = this._validateField(titleInput, 3);
      const isBodyValid = this._validateField(bodyInput, 10);
      
      if (isTitleValid && isBodyValid) {
        // Dispatch an event to add the note
        const addNoteEvent = new CustomEvent('note:add', {
          bubbles: true,
          detail: {
            title: titleInput.value.trim(),
            body: bodyInput.value.trim()
          }
        });
        
        this.dispatchEvent(addNoteEvent);
        
        // Reset form and validation state
        form.reset();
        this._clearValidationErrors();
        
        // Show success state on button temporarily
        const button = this.querySelector('.btn-submit');
        if (button) {
          const originalText = button.textContent;
          button.textContent = 'Catatan Ditambahkan! ✓';
          button.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
          
          setTimeout(() => {
            button.textContent = originalText;
            button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
          }, 2000);
        }
      }
    });
  }

  _validateField(input, minLength) {
    const formGroup = input.closest('.form-group');
    const value = input.value.trim();
    
    if (value.length === 0 || value.length < minLength) {
      formGroup.classList.add('error');
      return false;
    } else {
      formGroup.classList.remove('error');
      return true;
    }
  }

  _clearValidationErrors() {
    const formGroups = this.querySelectorAll('.form-group');
    formGroups.forEach(group => group.classList.remove('error'));
  }
}

customElements.define('note-form', NoteForm);