export class ApiResponse<T = any> {
  public statusCode: number;
  public success: boolean;
  public data: T;
  public message: string;

  constructor(statusCode: number, data: T, message: string = 'Success') {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.data = data;
    this.message = message;
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      success: this.success,
      data: this.data,
      message: this.message
    };
  }
}
