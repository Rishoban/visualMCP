import { LLMRouter } from '../llm-router';
import { GeminiLlmRouter } from './gemini-llm';
import { OpenAILLMRouter } from './openai-llm';
import { AnthoropicLLMRouter } from './anthropic-llm';

export class LLMRouterFactory {
  private commands: Record<string, LLMRouter>;
  constructor() {
    this.commands = {
      openai: new OpenAILLMRouter(),
      anthropic: new AnthoropicLLMRouter(),
      gemini: new GeminiLlmRouter(),
    };
  }

  public getRouter(
    type: string,
    apiKey: string,
    model: string,
  ): LLMRouter | null {
    const router = this.commands[type];
    if (router) {
      router.createClient(apiKey, model);
      return router;
    }
    return null;
  }
}
