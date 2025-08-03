export const formatNumberClientOnly = (value: number): string => {
  if (typeof window === "undefined") {
    // On the server, return the string representation without specific formatting
    // This avoids hydration mismatch if the server's default locale is different
    return value.toString()
  }
  // On the client, format the number using the 'id-ID' locale
  return new Intl.NumberFormat("id-ID").format(value)
}
