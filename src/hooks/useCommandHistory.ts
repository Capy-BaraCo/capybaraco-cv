import { useState, useCallback } from 'react'

export function useCommandHistory() {
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const addToHistory = useCallback((command: string) => {
    setHistory((prev) => [...prev, command])
    setHistoryIndex(-1)
  }, [])

  const getPreviousCommand = useCallback(() => {
    if (history.length === 0) return null
    const newIndex = Math.min(historyIndex + 1, history.length - 1)
    setHistoryIndex(newIndex)
    return history[history.length - 1 - newIndex]
  }, [history, historyIndex])

  const getNextCommand = useCallback(() => {
    if (historyIndex <= 0) {
      setHistoryIndex(-1)
      return null
    }
    const newIndex = historyIndex - 1
    setHistoryIndex(newIndex)
    return history[history.length - 1 - newIndex]
  }, [history, historyIndex])

  return {
    addToHistory,
    getPreviousCommand,
    getNextCommand,
  }
}
