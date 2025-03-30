import { render, screen, fireEvent } from "@testing-library/react"
import { NoteView } from "@/components/note-view"
import { translations } from "@/lib/translations"

describe("NoteView", () => {
  const mockNote = {
    id: "test-note-1",
    title: "Test Note",
    content: "This is a test note content",
    tags: ["Paris", "Hotel"],
    createdAt: new Date(),
    updatedAt: new Date(),
    archived: false,
  }

  const mockUpdateNote = jest.fn()
  const mockAddTag = jest.fn()
  const mockRemoveTag = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders note view with correct content", () => {
    render(
      <NoteView
        note={mockNote}
        onUpdateNote={mockUpdateNote}
        onAddTag={mockAddTag}
        onRemoveTag={mockRemoveTag}
        t={translations.en}
      />,
    )

    expect(screen.getByTestId("note-title")).toHaveTextContent(mockNote.title)
    expect(screen.getByTestId("note-content")).toHaveTextContent(mockNote.content)

    // Check if tags are displayed
    mockNote.tags.forEach((tag) => {
      expect(screen.getByTestId(`note-view-tag-${tag}`)).toBeInTheDocument()
    })
  })

  test("switches to edit mode when edit button is clicked", () => {
    render(
      <NoteView
        note={mockNote}
        onUpdateNote={mockUpdateNote}
        onAddTag={mockAddTag}
        onRemoveTag={mockRemoveTag}
        t={translations.en}
      />,
    )

    fireEvent.click(screen.getByTestId("edit-note-button"))

    expect(screen.getByTestId("note-title-input")).toBeInTheDocument()
    expect(screen.getByTestId("note-content-textarea")).toBeInTheDocument()
  })

  test("updates note when save button is clicked", () => {
    render(
      <NoteView
        note={mockNote}
        onUpdateNote={mockUpdateNote}
        onAddTag={mockAddTag}
        onRemoveTag={mockRemoveTag}
        t={translations.en}
      />,
    )

    // Enter edit mode
    fireEvent.click(screen.getByTestId("edit-note-button"))

    // Update title and content
    fireEvent.change(screen.getByTestId("note-title-input"), { target: { value: "Updated Title" } })
    fireEvent.change(screen.getByTestId("note-content-textarea"), { target: { value: "Updated content" } })

    // Save changes
    fireEvent.click(screen.getByTestId("save-note-button"))

    // Check if onUpdateNote was called with updated note
    expect(mockUpdateNote).toHaveBeenCalledWith(
      expect.objectContaining({
        id: mockNote.id,
        title: "Updated Title",
        content: "Updated content",
        tags: mockNote.tags,
      }),
    )
  })

  test("cancels editing when cancel button is clicked", () => {
    render(
      <NoteView
        note={mockNote}
        onUpdateNote={mockUpdateNote}
        onAddTag={mockAddTag}
        onRemoveTag={mockRemoveTag}
        t={translations.en}
      />,
    )

    // Enter edit mode
    fireEvent.click(screen.getByTestId("edit-note-button"))

    // Update title and content
    fireEvent.change(screen.getByTestId("note-title-input"), { target: { value: "Updated Title" } })
    fireEvent.change(screen.getByTestId("note-content-textarea"), { target: { value: "Updated content" } })

    // Cancel changes
    fireEvent.click(screen.getByTestId("cancel-edit-button"))

    // Check if we're back in view mode with original content
    expect(screen.getByTestId("note-title")).toHaveTextContent(mockNote.title)
    expect(screen.getByTestId("note-content")).toHaveTextContent(mockNote.content)

    // Check that onUpdateNote was not called
    expect(mockUpdateNote).not.toHaveBeenCalled()
  })

  test("shows archive badge when note is archived", () => {
    const archivedNote = { ...mockNote, archived: true }

    render(
      <NoteView
        note={archivedNote}
        onUpdateNote={mockUpdateNote}
        onAddTag={mockAddTag}
        onRemoveTag={mockRemoveTag}
        t={translations.en}
      />,
    )

    // Check if archive badge is displayed
    expect(screen.getByText(translations.en.archivedNotes)).toBeInTheDocument()
  })
})

