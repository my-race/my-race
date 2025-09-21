export interface ErrorResponse {
  error?: string;
}
export class ApiError extends Error {
  public readonly status: number;
  public readonly response: ErrorResponse;

  constructor(message: string, status: number, response: ErrorResponse) {
    super(message);
    this.status = status;
    this.response = response;
  }
}
