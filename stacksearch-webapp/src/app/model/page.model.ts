export interface Page<T> {
  items: T[],
  has_more: boolean
}

export function emptyPage() {
  return {
    items: [],
    has_more: false
  }
}
