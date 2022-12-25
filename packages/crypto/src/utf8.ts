export function utf8Encode(input: string) {
  return new TextEncoder().encode(input);
}

export function utf8Decode(input: Uint8Array) {
  return new TextDecoder().decode(input);
}
