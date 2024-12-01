export function setStorage(name: string, value: any) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(name, value);
  }
}

export function getStorage(name: string) {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(name);
  }
}
