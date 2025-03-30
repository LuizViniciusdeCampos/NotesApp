"use client"

import { useState, useEffect } from "react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Tag, Clock, Plus, X, Archive } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { availableTags } from "@/lib/data"
import type { Note, Translations } from "@/lib/types"

interface NoteViewProps {
  note: Note
  onUpdateNote: (note: Note) => void
  onAddTag: (tag: string) => void
  onRemoveTag: (tag: string) => void
  t: Translations
}

export function NoteView({ note, onUpdateNote, onAddTag, onRemoveTag, t }: NoteViewProps) {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [isEditing, setIsEditing] = useState(false)
  const [tagDialogOpen, setTagDialogOpen] = useState(false)
  const [selectedTag, setSelectedTag] = useState("")

  // Update local state when selected note changes
  useEffect(() => {
    setTitle(note.title)
    setContent(note.content)
    setIsEditing(false)
  }, [note])

  const handleSave = () => {
    onUpdateNote({
      ...note,
      title,
      content,
      updatedAt: new Date(),
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTitle(note.title)
    setContent(note.content)
    setIsEditing(false)
  }

  const handleAddTag = () => {
    if (selectedTag) {
      onAddTag(selectedTag)
      setSelectedTag("")
      setTagDialogOpen(false)
    }
  }

  const formatDate = (date: Date, language: "en" | "pt") => {
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: language === "pt" ? ptBR : undefined,
    })
  }

  return (
    <motion.div
      className="border-r p-6 overflow-auto"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      data-testid="note-view"
    >
      <div className="flex items-center justify-between mb-4">
        {isEditing ? (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-semibold border-none bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            data-testid="note-title-input"
          />
        ) : (
          <motion.h2
            className="text-2xl font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            data-testid="note-title"
          >
            {title}
          </motion.h2>
        )}

        {note.archived && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Badge variant="outline" className="flex items-center gap-1">
              <Archive className="h-3 w-3" />
              {t.archivedNotes}
            </Badge>
          </motion.div>
        )}
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{t.tags}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {note.tags.map((tag) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                data-testid={`note-view-tag-${tag}`}
              >
                <Badge variant="secondary" className="flex items-center gap-1">
                  {tag}
                  {isEditing && (
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => onRemoveTag(tag)}
                      data-testid={`remove-tag-${tag}`}
                    />
                  )}
                </Badge>
              </motion.div>
            ))}
          </AnimatePresence>

          {isEditing && (
            <Dialog open={tagDialogOpen} onOpenChange={setTagDialogOpen}>
              <DialogTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" className="h-6 gap-1" data-testid="add-tag-button">
                    <Plus className="h-3 w-3" /> {t.addTag}
                  </Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t.addTag}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-2">
                    {availableTags
                      .filter((tag) => !note.tags.includes(tag))
                      .map((tag) => (
                        <Button
                          key={tag}
                          variant={selectedTag === tag ? "default" : "outline"}
                          onClick={() => setSelectedTag(tag)}
                          className="justify-start"
                          data-testid={`select-tag-${tag}`}
                        >
                          <Tag className="mr-2 h-4 w-4" />
                          {tag}
                        </Button>
                      ))}
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddTag} data-testid="confirm-add-tag">
                    {t.add}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span>{t.lastEdited}</span>
        <span data-testid="last-edited-time">{formatDate(note.updatedAt, t.locale)}</span>
      </div>

      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            key="editing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[300px] border-none bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder={t.noteContentPlaceholder}
              data-testid="note-content-textarea"
            />
          </motion.div>
        ) : (
          <motion.div
            key="viewing"
            className="whitespace-pre-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            data-testid="note-content"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2 mt-6">
        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div
              key="editing-actions"
              className="flex gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleSave} data-testid="save-note-button">
                  {t.saveNote}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" onClick={handleCancel} data-testid="cancel-edit-button">
                  {t.cancel}
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="view-actions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button onClick={() => setIsEditing(true)} data-testid="edit-note-button">
                {t.editNote}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

