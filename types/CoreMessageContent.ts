export type CoreMessageContent = 
  | { type: 'text'; text: string }
  | { type: 'image'; image: string };
