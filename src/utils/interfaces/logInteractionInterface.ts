export default interface LogInteractionInterface {
  sessionId: string;
  userQuery: string;
  llmResponse: string;
  responseTimeMs: number;
}
