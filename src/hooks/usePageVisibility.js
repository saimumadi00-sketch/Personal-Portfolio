import { useSyncExternalStore } from 'react'
const subscribe = (callback) => { document.addEventListener('visibilitychange', callback); return () => document.removeEventListener('visibilitychange', callback) }
const snapshot = () => document.visibilityState !== 'hidden'
export default function usePageVisibility() { return useSyncExternalStore(subscribe, snapshot, () => true) }
