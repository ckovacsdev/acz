/** Anna's links and email, shared by the Contact section, Publications and the footer. */

export const INSTAGRAM_URL = 'https://www.instagram.com/aczapan/'

/** Anna's resume, served from public/. */
export const RESUME_URL = '/anna-cuciurean-zapan-resume.pdf'

/** Where more of Anna's writing lives. */
export const WRITING = [
  { label: 'The Luna Collective', href: 'https://www.thelunacollective.co/search?q=anna%20cuciurean-zapan' },
  { label: 'Medium', href: 'https://medium.com/@acuciure/' },
  { label: 'Substack', href: 'https://hpy2bhere.substack.com/' },
]

// The address is stored reversed and base64-encoded and only assembled when someone asks to
// copy it, so it never appears as plain text in the page or its HTML for scrapers.
const ENCODED_EMAIL = 'bW9jLmxpYW1nQGVydWljdWNh'
export const email = () => atob(ENCODED_EMAIL).split('').reverse().join('')

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Older browsers, or the clipboard permission was refused: try the legacy route.
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    const ok = document.execCommand('copy')
    area.remove()
    return ok
  }
}

/**
 * Copies Anna's email to the clipboard. Returns true on success; where copying isn't
 * possible it opens the visitor's email app instead and returns false.
 */
export async function copyEmail() {
  const address = email()
  if (await copyText(address)) return true
  window.location.href = `mailto:${address}`
  return false
}
