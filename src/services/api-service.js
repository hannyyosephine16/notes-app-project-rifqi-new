const API_URL = 'https://notes-api.dicoding.dev/v2';

class ApiService {
  static async getNotes() {
    try {
      const response = await fetch(`${API_URL}/notes`);
      const responseJson = await response.json();
      
      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message);
      }
      
      return responseJson.data;
    } catch (error) {
      throw new Error(`Failed to get notes: ${error.message}`);
    }
  }

  static async getArchivedNotes() {
    try {
      const response = await fetch(`${API_URL}/notes/archived`);
      const responseJson = await response.json();
      
      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message);
      }
      
      return responseJson.data;
    } catch (error) {
      throw new Error(`Failed to get archived notes: ${error.message}`);
    }
  }

  static async getSingleNote(id) {
    try {
      const response = await fetch(`${API_URL}/notes/${id}`);
      const responseJson = await response.json();
      
      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message);
      }
      
      return responseJson.data;
    } catch (error) {
      throw new Error(`Failed to get note: ${error.message}`);
    }
  }

  static async createNote(title, body) {
    try {
      const response = await fetch(`${API_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
      });
      
      const responseJson = await response.json();
      
      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message);
      }
      
      return responseJson.data;
    } catch (error) {
      throw new Error(`Failed to create note: ${error.message}`);
    }
  }

  static async archiveNote(id) {
    try {
      const response = await fetch(`${API_URL}/notes/${id}/archive`, {
        method: 'POST',
      });
      
      const responseJson = await response.json();
      
      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message);
      }
      
      return true;
    } catch (error) {
      throw new Error(`Failed to archive note: ${error.message}`);
    }
  }

  static async unarchiveNote(id) {
    try {
      const response = await fetch(`${API_URL}/notes/${id}/unarchive`, {
        method: 'POST',
      });
      
      const responseJson = await response.json();
      
      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message);
      }
      
      return true;
    } catch (error) {
      throw new Error(`Failed to unarchive note: ${error.message}`);
    }
  }

  static async deleteNote(id) {
    try {
      const response = await fetch(`${API_URL}/notes/${id}`, {
        method: 'DELETE',
      });
      
      const responseJson = await response.json();
      
      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message);
      }
      
      return true;
    } catch (error) {
      throw new Error(`Failed to delete note: ${error.message}`);
    }
  }
}

export default ApiService;