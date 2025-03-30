export type Language = "en" | "pt"

export interface Translations {
  locale: Language
  allNotes: string
  archivedNotes: string
  createNewNote: string
  newNote: string
  editNote: string
  saveNote: string
  cancel: string
  archiveNote: string
  unarchiveNote: string
  deleteNote: string
  search: string
  tags: string
  activeTags: string
  addTag: string
  add: string
  lastEdited: string
  noNotesFound: string
  selectNoteToView: string
  noteContentPlaceholder: string
  noteCreated: string
  noteCreatedDescription: string
  noteArchived: string
  noteArchivedDescription: string
  noteUnarchived: string
  noteUnarchivedDescription: string
  noteDeleted: string
  noteDeletedDescription: string
  tagAdded: string
  tagAddedDescription: string
  tagRemoved: string
  tagRemovedDescription: string
}

export interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  archived: boolean
}

