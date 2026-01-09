import Anthropic from '@anthropic-ai/sdk';
import { LLMRouter } from '../llm-router';

export class AnthoropicLLMRouter implements LLMRouter {
  private client: Anthropic;
  private modelName: string;

  constructor() {}

  public createClient(apiKey: string, model: string): void {
    this.client = new Anthropic({
      apiKey: apiKey,
    });

    this.modelName = model?.trim() || 'claude-2';
  }

  public async getResult(prompt: string): Promise<string> {
    const msg = await this.client.messages.create({
      model: this.modelName,
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    if (
      !msg ||
      !Array.isArray(msg.content) ||
      typeof msg.content[0]?.text !== 'string'
    ) {
      throw new Error('Invalid response from Anthropic');
    }
    return msg.content[0].text;
  }
}
