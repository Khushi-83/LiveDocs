/**
 * User model
 * 
 * This is a placeholder for a future database model.
 * In a production application, this would be connected to a database
 * and include authentication methods.
 */

export class User {
  /**
   * Create a new user
   * @param {string} id - The user ID
   * @param {string} username - The username
   * @param {string} email - The user's email
   * @param {string} password - The user's hashed password
   */
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password; // In a real app, this would be hashed
    this.createdAt = new Date();
    this.documents = []; // IDs of documents the user has access to
  }

  /**
   * Add a document to the user's document list
   * @param {string} documentId - The document ID to add
   */
  addDocument(documentId) {
    if (!this.documents.includes(documentId)) {
      this.documents.push(documentId);
    }
  }

  /**
   * Remove a document from the user's document list
   * @param {string} documentId - The document ID to remove
   */
  removeDocument(documentId) {
    this.documents = this.documents.filter(id => id !== documentId);
  }

  /**
   * Check if the user has access to a document
   * @param {string} documentId - The document ID to check
   * @returns {boolean} - Whether the user has access to the document
   */
  hasAccessToDocument(documentId) {
    return this.documents.includes(documentId);
  }
}