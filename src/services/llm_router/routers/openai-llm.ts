import OpenAI from 'openai';
import { LLMRouter } from '../llm-router';

export class OpenAILLMRouter implements LLMRouter {
  private client: OpenAI;
  private modelName: string;

  constructor() {}

  public createClient(apiKey: string, model: string): void {
    this.client = new OpenAI({
      apiKey: apiKey,
    });
    this.modelName = model?.trim() || 'gpt-4o-mini';
  }

  public async getResult(prompt: string): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: this.modelName,
      messages: [{ role: 'user', content: prompt }],
    });

    return response.choices[0].message?.content || '';
  }
}
