import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { NotesApp } from "@/components/notes-app"
import { initialNotes } from "@/lib/data"

// Mock the toast component
jest.mock("@/components/ui/use-toast", () => ({
  toast: jest.fn(),
}))

describe("NotesApp", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders the NotesApp with initial notes", () => {
    render(<NotesApp />)

    // Check if the app title is rendered
    expect(screen.getByText("NotesApp")).toBeInTheDocument()

    // Check if the view title is rendered
    expect(screen.getByTestId("view-title")).toHaveTextContent("All Notes")

    // Check if the first note is rendered and selected
    expect(screen.getByTestId(`note-item-${initialNotes[0].id}`)).toBeInTheDocument()

    // Check if the note content is displayed
    expect(screen.getByTestId("note-content")).toHaveTextContent(initialNotes[0].content)
  })

  test("creates a new note", async () => {
    render(<NotesApp />)

    // Click the create note button
    fireEvent.click(screen.getByTestId("create-note-button"))

    // Check if a new note is created and selected
    await waitFor(() => {
      expect(screen.getByTestId("note-title")).toHaveTextContent("New Note")
    })
  })

  test("edits a note", async () => {
    render(<NotesApp />)

    // Click the edit button
    fireEvent.click(screen.getByTestId("edit-note-button"))

    // Edit the title
    const titleInput = screen.getByTestId("note-title-input")
    fireEvent.change(titleInput, { target: { value: "Updated Title" } })

    // Edit the content
    const contentInput = screen.getByTestId("note-content-textarea")
    fireEvent.change(contentInput, { target: { value: "Updated content" } })

    // Save the note
    fireEvent.click(screen.getByTestId("save-note-button"))

    // Check if the note is updated
    await waitFor(() => {
      expect(screen.getByTestId("note-title")).toHaveTextContent("Updated Title")
      expect(screen.getByTestId("note-content")).toHaveTextContent("Updated content")
    })
  })

  test("archives a note", async () => {
    render(<NotesApp />)

    // Get the first note ID
    const firstNoteId = initialNotes[0].id

    // Click the archive button
    fireEvent.click(screen.getByTestId("archive-button"))

    // Switch to archived notes view
    fireEvent.click(screen.getByTestId("archived-notes-button"))

    // Check if the note appears in archived notes
    await waitFor(() => {
      expect(screen.getByTestId(`note-item-${firstNoteId}`)).toBeInTheDocument()
    })
  })

  test("unarchives a note", async () => {
    render(<NotesApp />)

    // Switch to archived notes view
    fireEvent.click(screen.getByTestId("archived-notes-button"))

    // Find an archived note
    const archivedNoteId = initialNotes.find((note) => note.archived)?.id
    if (!archivedNoteId) throw new Error("No archived note found in test data")

    // Select the archived note
    fireEvent.click(screen.getByTestId(`note-item-${archivedNoteId}`))

    // Click the unarchive button
    fireEvent.click(screen.getByTestId("unarchive-button"))

    // Switch back to all notes view
    fireEvent.click(screen.getByTestId("all-notes-button"))

    // Check if the note appears in all notes
    await waitFor(() => {
      expect(screen.getByTestId(`note-item-${archivedNoteId}`)).toBeInTheDocument()
    })
  })

  test("deletes a note", async () => {
    render(<NotesApp />)

    // Get the first note ID
    const firstNoteId = initialNotes[0].id

    // Click the delete button
    fireEvent.click(screen.getByTestId("delete-button"))

    // Check if the note is removed from the list
    await waitFor(() => {
      expect(screen.queryByTestId(`note-item-${firstNoteId}`)).not.toBeInTheDocument()
    })
  })

  test("searches notes by text", async () => {
    render(<NotesApp />)

    // Type in the search input
    fireEvent.change(screen.getByTestId("search-input"), { target: { value: "London" } })

    // Check if only notes with "London" are displayed
    await waitFor(() => {
      const londonNote = initialNotes.find((note) => note.title.includes("London"))
      if (!londonNote) throw new Error("No London note found in test data")

      expect(screen.getByTestId(`note-item-${londonNote.id}`)).toBeInTheDocument()
      expect(screen.queryByTestId(`note-item-${initialNotes[0].id}`)).not.toBeInTheDocument()
    })
  })

  test("filters notes by tag", async () => {
    render(<NotesApp />)

    // Click on a tag filter
    fireEvent.click(screen.getByTestId("tag-filter-London"))

    // Check if only notes with "London" tag are displayed
    await waitFor(() => {
      const londonNote = initialNotes.find((note) => note.tags.includes("London"))
      if (!londonNote) throw new Error("No note with London tag found in test data")

      expect(screen.getByTestId(`note-item-${londonNote.id}`)).toBeInTheDocument()
      expect(screen.queryByTestId(`note-item-${initialNotes[0].id}`)).not.toBeInTheDocument()
    })
  })

  test("toggles language between English and Portuguese", async () => {
    render(<NotesApp />)

    // Check initial language is English
    expect(screen.getByTestId("view-title")).toHaveTextContent("All Notes")

    // Toggle language
    fireEvent.click(screen.getByTestId("language-toggle"))

    // Check if language changed to Portuguese
    await waitFor(() => {
      expect(screen.getByTestId("view-title")).toHaveTextContent("Todas as Notas")
    })

    // Toggle language back to English
    fireEvent.click(screen.getByTestId("language-toggle"))

    // Check if language changed back to English
    await waitFor(() => {
      expect(screen.getByTestId("view-title")).toHaveTextContent("All Notes")
    })
  })

  test("adds and removes tags from a note", async () => {
    render(<NotesApp />)

    // Click the edit button
    fireEvent.click(screen.getByTestId("edit-note-button"))

    // Click the add tag button
    fireEvent.click(screen.getByTestId("add-tag-button"))

    // Select a tag that's not already on the note
    const availableTag = "Food"
    fireEvent.click(screen.getByTestId(`select-tag-${availableTag}`))

    // Confirm adding the tag
    fireEvent.click(screen.getByTestId("confirm-add-tag"))

    // Check if the tag was added
    await waitFor(() => {
      expect(screen.getByTestId(`note-view-tag-${availableTag}`)).toBeInTheDocument()
    })

    // Remove the tag
    fireEvent.click(screen.getByTestId(`remove-tag-${availableTag}`))

    // Check if the tag was removed
    await waitFor(() => {
      expect(screen.queryByTestId(`note-view-tag-${availableTag}`)).not.toBeInTheDocument()
    })
  })

  test("searches notes by tag name", async () => {
    render(<NotesApp />)

    // Type a tag name in the search input
    fireEvent.change(screen.getByTestId("search-input"), { target: { value: "Paris" } })

    // Check if notes with Paris tag are displayed
    await waitFor(() => {
      // Get all notes with Paris tag
      const parisNotes = initialNotes.filter((note) => note.tags.includes("Paris") && !note.archived)

      // Check that all Paris notes are displayed
      parisNotes.forEach((note) => {
        expect(screen.getByTestId(`note-item-${note.id}`)).toBeInTheDocument()
      })

      // Check that a note without Paris tag is not displayed
      const nonParisNote = initialNotes.find((note) => !note.tags.includes("Paris") && !note.archived)
      if (nonParisNote) {
        expect(screen.queryByTestId(`note-item-${nonParisNote.id}`)).not.toBeInTheDocument()
      }
    })
  })
})

