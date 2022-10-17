export const newLineFormatter = (str: String): string[] => {
  const result = str.split("\n")
  if (typeof result === "string") {
    return new Array(result)
  } else {
    return result
  }
}
