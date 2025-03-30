"use client"

import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Plus, Tag, Archive } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { Note, Translations } from "@/lib/types"
import { cn } from "@/lib/utils"

interface NotesListProps {
  notes: Note[]
  selectedNoteId: string
  setSelectedNoteId: (id: string) => void
  onCreateNote: () => void
  t: Translations
}

export function NotesList({ notes, selectedNoteId, setSelectedNoteId, onCreateNote, t }: NotesListProps) {
  const formatDate = (date: Date, language: "en" | "pt") => {
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: language === "pt" ? ptBR : undefined,
    })
  }

  return (
    <div className="border-r overflow-auto" data-testid="notes-list">
      <div className="p-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={onCreateNote}
            className="w-full justify-center"
            variant="outline"
            data-testid="create-note-button"
          >
            <Plus className="mr-2 h-4 w-4" /> {t.createNewNote}
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        <div className="space-y-2 p-2">
          {notes.map((note) => (
            <motion.div
              key={note.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={cn("p-3 rounded-md cursor-pointer hover:bg-muted", selectedNoteId === note.id && "bg-muted")}
              onClick={() => setSelectedNoteId(note.id)}
              data-testid={`note-item-${note.id}`}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{note.title}</h3>
                {note.archived && <Archive className="h-3 w-3 text-muted-foreground" />}
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {note.tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center text-xs text-muted-foreground"
                    data-testid={`note-tag-${tag}`}
                  >
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{formatDate(note.updatedAt, t.locale)}</p>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  )
}

