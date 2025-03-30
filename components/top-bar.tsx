"use client"

import { Globe, Search } from "lucide-react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { Language, Translations } from "@/lib/types"

interface TopBarProps {
  activeView: "all" | "archived"
  language: Language
  toggleLanguage: () => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  t: Translations
}

export function TopBar({ activeView, language, toggleLanguage, searchQuery, setSearchQuery, t }: TopBarProps) {
  return (
    <motion.div
      className="border-b flex items-center justify-between p-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      data-testid="top-bar"
    >
      <motion.h1
        className="text-xl font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        data-testid="view-title"
      >
        {activeView === "all" ? t.allNotes : t.archivedNotes}
      </motion.h1>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t.search}
            className="w-[300px] pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="search-input"
          />
        </div>

        <motion.div whileHover={{ scale: 1.1, rotate: 10 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={toggleLanguage}
            title={language === "en" ? "Switch to Portuguese" : "Mudar para Inglês"}
            data-testid="language-toggle"
          >
            <Globe className="h-5 w-5" />
            <span className="sr-only">{language === "en" ? "Switch to Portuguese" : "Mudar para Inglês"}</span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

