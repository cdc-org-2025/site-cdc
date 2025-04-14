export async function fetchMessages(locale: string) {
  try {
    const messages = await import(`../messages/${locale}.json`)
    return messages.default
  } catch (error) {
    console.error(error)
    return undefined
  }
}
