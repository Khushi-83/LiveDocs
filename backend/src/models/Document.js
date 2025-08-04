/**
 * Document model
 * 
 * This is a placeholder for a future database model.
 * Currently, documents are only stored in memory during the WebSocket session.
 * In a production application, this would be connected to a database.
 */

export class Document {
  /**
   * Create a new document
   * @param {string} id - The document ID
   * @param {string} title - The document title
   * @param {string} content - The document content (could be JSON or other format)
   * @param {string} createdBy - The user who created the document
   */
  constructor(id, title, content = '', createdBy) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdBy = createdBy;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.collaborators = [createdBy];
  }

  /**
   * Add a collaborator to the document
   * @param {string} userId - The user ID to add as a collaborator
   */
  addCollaborator(userId) {
    if (!this.collaborators.includes(userId)) {
      this.collaborators.push(userId);
    }
  }

  /**
   * Update the document content
   * @param {string} content - The new document content
   */
  updateContent(content) {
    this.content = content;
    this.updatedAt = new Date();
  }

  /**
   * Update the document title
   * @param {string} title - The new document title
   */
  updateTitle(title) {
    this.title = title;
    this.updatedAt = new Date();
  }
}