export interface ApiResponse<T> {
  transactionId: string;
  executionTime: string;
  message: string;
  result: T;
}
