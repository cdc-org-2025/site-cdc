export async function fetchMessages(locale: string) {
  if (!locale) {
    throw new Error('Parâmetro locale é obrigatório')
  }

  try {
    const messages = await import(`../../messages/${locale}.json`)
    return messages.default
  } catch (error) {
    console.error(`Erro ao importar mensagens para o locale: ${locale}`, error)
    return undefined
  }
}
