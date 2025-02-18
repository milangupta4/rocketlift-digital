interface PlantUMLEncoder {
  encode(text: string): string;
  decode(encoded: string): string;
}

declare global {
  interface Window {
    plantumlEncoder: {
      encode(text: string): string;
      decode(encoded: string): string;
    }
  }
}

export {} 