"use client"

export type RecoveryEntry = {
  id: number
  title: string
  content: string
  mood: string
  isPrivate: boolean
  createdAt: string
}

let recoveryEntries: RecoveryEntry[] = [
  {
    id: 1,
    title: "Still standing",
    content:
      "Today I reminded myself that survival is not the end goal. Rebuilding is.",
    mood: "Focused",
    isPrivate: false,
    createdAt: "Today, 8:15 AM",
  },
  {
    id: 2,
    title: "Quiet win",
    content:
      "I kept moving today even when my mind tried to drag me backward.",
    mood: "Heavy",
    isPrivate: true,
    createdAt: "Yesterday, 9:42 PM",
  },
]

export function getRecoveryEntries() {
  return recoveryEntries
}

export function getSharedRecoveryEntries() {
  return recoveryEntries.filter((entry) => !entry.isPrivate)
}

export function addRecoveryEntry(entry: RecoveryEntry) {
  recoveryEntries = [entry, ...recoveryEntries]
}