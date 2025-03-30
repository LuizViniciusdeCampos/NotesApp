"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { Translations } from "@/lib/types"

interface NoteActionsProps {
  onArchive: () => void
  onUnarchive: () => void
  onDelete: () => void
  isArchived: boolean
  t: Translations
}

export function NoteActions({ onArchive, onUnarchive, onDelete, isArchived, t }: NoteActionsProps) {
  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      data-testid="note-actions"
    >
      <div className="space-y-2">
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          {isArchived ? (
            <Button
              variant="outline"
              className="w-full justify-center"
              onClick={onUnarchive}
              data-testid="unarchive-button"
            >
              {t.unarchiveNote}
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full justify-center"
              onClick={onArchive}
              data-testid="archive-button"
            >
              {t.archiveNote}
            </Button>
          )}
        </motion.div>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button variant="outline" className="w-full justify-center" onClick={onDelete} data-testid="delete-button">
            {t.deleteNote}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

