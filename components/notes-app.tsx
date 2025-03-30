"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Sidebar } from "./sidebar"
import { NotesList } from "./notes-list"
import { NoteView } from "./note-view"
import { NoteActions } from "./note-actions"
import { TopBar } from "./top-bar"
import type { Note, Language } from "@/lib/types"
import { initialNotes } from "@/lib/data"
import { translations } from "@/lib/translations"
import { toast } from "@/components/ui/use-toast"

export function NotesApp() {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [selectedNoteId, setSelectedNoteId] = useState<string>(notes[0]?.id || "")
  const [activeView, setActiveView] = useState<"all" | "archived">("all")
  const [language, setLanguage] = useState<Language>("en")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchTags, setSearchTags] = useState<string[]>([])

  const t = translations[language]

  const selectedNote = notes.find((note) => note.id === selectedNoteId)

  const filteredNotes = notes.filter((note) => {
    // Filter by archive status
    const matchesArchiveStatus = activeView === "all" ? !note.archived : note.archived

    // Filter by search query
    const matchesSearchQuery =
      searchQuery === "" ||
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    // Filter by tags
    const matchesTags = searchTags.length === 0 || searchTags.some((searchTag) => note.tags.includes(searchTag))

    return matchesArchiveStatus && matchesSearchQuery && matchesTags
  })

  const handleCreateNote = () => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: t.newNote,
      content: "",
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      archived: false,
    }

    setNotes([newNote, ...notes])
    setSelectedNoteId(newNote.id)
    toast({
      title: t.noteCreated,
      description: t.noteCreatedDescription,
    })
  }

  const handleUpdateNote = (updatedNote: Note) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)))
  }

  const handleArchiveNote = () => {
    if (!selectedNote) return

    const updatedNote = {
      ...selectedNote,
      archived: true,
      updatedAt: new Date(),
    }

    handleUpdateNote(updatedNote)

    if (filteredNotes.length > 1) {
      const nextNoteIndex = filteredNotes.findIndex((note) => note.id === selectedNoteId)
      const nextNote = filteredNotes[nextNoteIndex + 1] || filteredNotes[nextNoteIndex - 1]
      if (nextNote) {
        setSelectedNoteId(nextNote.id)
      }
    } else {
      setSelectedNoteId("")
    }

    toast({
      title: t.noteArchived,
      description: t.noteArchivedDescription,
    })
  }

  const handleUnarchiveNote = () => {
    if (!selectedNote) return

    const updatedNote = {
      ...selectedNote,
      archived: false,
      updatedAt: new Date(),
    }

    handleUpdateNote(updatedNote)

    if (filteredNotes.length > 1) {
      const nextNoteIndex = filteredNotes.findIndex((note) => note.id === selectedNoteId)
      const nextNote = filteredNotes[nextNoteIndex + 1] || filteredNotes[nextNoteIndex - 1]
      if (nextNote) {
        setSelectedNoteId(nextNote.id)
      }
    } else {
      setSelectedNoteId("")
    }

    toast({
      title: t.noteUnarchived,
      description: t.noteUnarchivedDescription,
    })
  }

  const handleDeleteNote = () => {
    if (!selectedNote) return

    setNotes(notes.filter((note) => note.id !== selectedNoteId))

    if (filteredNotes.length > 1) {
      const nextNoteIndex = filteredNotes.findIndex((note) => note.id === selectedNoteId)
      const nextNote = filteredNotes[nextNoteIndex + 1] || filteredNotes[nextNoteIndex - 1]
      if (nextNote) {
        setSelectedNoteId(nextNote.id)
      }
    } else {
      setSelectedNoteId("")
    }

    toast({
      title: t.noteDeleted,
      description: t.noteDeletedDescription,
      variant: "destructive",
    })
  }

  const handleAddTag = (tag: string) => {
    if (!selectedNote) return
    if (selectedNote.tags.includes(tag)) return

    const updatedNote = {
      ...selectedNote,
      tags: [...selectedNote.tags, tag],
      updatedAt: new Date(),
    }

    handleUpdateNote(updatedNote)
    toast({
      title: t.tagAdded,
      description: t.tagAddedDescription.replace("{tag}", tag),
    })
  }

  const handleRemoveTag = (tag: string) => {
    if (!selectedNote) return

    const updatedNote = {
      ...selectedNote,
      tags: selectedNote.tags.filter((t) => t !== tag),
      updatedAt: new Date(),
    }

    handleUpdateNote(updatedNote)
    toast({
      title: t.tagRemoved,
      description: t.tagRemovedDescription.replace("{tag}", tag),
    })
  }

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "pt" : "en"))
    toast({
      title: language === "en" ? "Idioma alterado para Português" : "Language changed to English",
      description: language === "en" ? "O aplicativo agora está em Português" : "The application is now in English",
    })
  }

  // Update selected note if current one is not in filtered list
  useEffect(() => {
    if (selectedNoteId && !filteredNotes.some((note) => note.id === selectedNoteId)) {
      setSelectedNoteId(filteredNotes[0]?.id || "")
    }
  }, [filteredNotes, selectedNoteId])

  return (
    <motion.div
      className="grid grid-cols-[250px_1fr] grid-rows-[auto_1fr] h-screen border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      data-testid="notes-app"
    >
      <motion.div
        className="border-r border-b"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="p-4 flex items-center gap-2">
          <span className="text-xl font-bold">NotesApp</span>
        </div>
      </motion.div>

      <TopBar
        activeView={activeView}
        language={language}
        toggleLanguage={toggleLanguage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        t={t}
      />

      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        searchTags={searchTags}
        setSearchTags={setSearchTags}
        t={t}
      />

      <div className="grid grid-cols-[1fr_2fr_1fr] h-full relative after:absolute after:inset-x-0 after:bottom-0 after:h-1/2 after:bg-gradient-to-b after:from-transparent after:to-background/50 after:pointer-events-none">
        <NotesList
          notes={filteredNotes}
          selectedNoteId={selectedNoteId}
          setSelectedNoteId={setSelectedNoteId}
          onCreateNote={handleCreateNote}
          t={t}
        />

        <AnimatePresence mode="wait">
          {selectedNote ? (
            <motion.div
              key={selectedNote.id}
              className="contents"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <NoteView
                note={selectedNote}
                onUpdateNote={handleUpdateNote}
                onAddTag={handleAddTag}
                onRemoveTag={handleRemoveTag}
                t={t}
              />
              <NoteActions
                onArchive={handleArchiveNote}
                onUnarchive={handleUnarchiveNote}
                onDelete={handleDeleteNote}
                isArchived={selectedNote.archived}
                t={t}
              />
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              className="col-span-3 flex items-center justify-center text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filteredNotes.length === 0 ? (
                <div className="text-center">
                  <p>{t.noNotesFound}</p>
                  <motion.button
                    onClick={handleCreateNote}
                    className="mt-4 px-4 py-2 border rounded hover:bg-muted"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t.createNewNote}
                  </motion.button>
                </div>
              ) : (
                <p>{t.selectNoteToView}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

