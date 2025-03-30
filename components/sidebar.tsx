"use client"

import { Home, Archive, Tag, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { availableTags } from "@/lib/data"
import type { Translations } from "@/lib/types"

interface SidebarProps {
  activeView: "all" | "archived"
  setActiveView: (view: "all" | "archived") => void
  searchTags: string[]
  setSearchTags: (tags: string[]) => void
  t: Translations
}

export function Sidebar({ activeView, setActiveView, searchTags, setSearchTags, t }: SidebarProps) {
  const toggleTagFilter = (tag: string) => {
    if (searchTags.includes(tag)) {
      setSearchTags(searchTags.filter((t) => t !== tag))
    } else {
      setSearchTags([...searchTags, tag])
    }
  }

  return (
    <motion.div
      className="border-r h-full overflow-auto"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      data-testid="sidebar"
    >
      <div className="space-y-1 p-2">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="ghost"
            className={cn("w-full justify-start", activeView === "all" && "bg-muted")}
            onClick={() => setActiveView("all")}
            data-testid="all-notes-button"
          >
            <Home className="mr-2 h-4 w-4" />
            {t.allNotes}
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="ghost"
            className={cn("w-full justify-start", activeView === "archived" && "bg-muted")}
            onClick={() => setActiveView("archived")}
            data-testid="archived-notes-button"
          >
            <Archive className="mr-2 h-4 w-4" />
            {t.archivedNotes}
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {searchTags.length > 0 && (
          <motion.div
            className="px-3 py-2 border-t mt-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            data-testid="active-tags-container"
          >
            <p className="text-sm font-medium mb-2">{t.activeTags}:</p>
            <div className="flex flex-wrap gap-1">
              {searchTags.map((tag) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge variant="secondary" className="flex items-center gap-1" data-testid={`active-tag-${tag}`}>
                    {tag}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => toggleTagFilter(tag)}
                      data-testid={`remove-tag-filter-${tag}`}
                    />
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 px-3 py-2 border-t">
        <p className="text-sm font-medium mb-2">{t.tags}</p>
        <div className="space-y-1">
          {availableTags.map((tag) => (
            <motion.div key={tag} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant={searchTags.includes(tag) ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => toggleTagFilter(tag)}
                data-testid={`tag-filter-${tag}`}
              >
                <Tag className="mr-2 h-4 w-4" />
                {tag}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

