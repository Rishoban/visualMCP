export interface LLMRouter {
  createClient(apiKey: string, model: string): void;
  getResult(prompt: string): Promise<string>;
}
