import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { LLMRouter } from '../llm-router';

export class GeminiLlmRouter implements LLMRouter {
  private client: GenerativeModel;
  private modelName: string;

  constructor() {}

  public createClient(apiKey: string, model: string): void {
    const genAI = new GoogleGenerativeAI(apiKey);
    this.modelName = model?.trim() || 'gemini-1.5-pro';
    this.client = genAI.getGenerativeModel({ model: this.modelName });
  }

  async getResult(prompt: string): Promise<string> {
    try {
      const result = await this.client.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      throw new Error(
        `Gemini (${this.modelName}) failed: ${(error as Error).message}`,
      );
    }
  }
}
