class ApiResponse {
  constructor(statusCode,status, data, message = "Success") {
    this.success = status;
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}

export { ApiResponse };
