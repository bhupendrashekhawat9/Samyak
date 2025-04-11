interface ApiResponse<T> {
    status: number;
    message: string;
    data: T | null;
}

export const createResponse = <T>(
    status: number,
    message: string,
    data: T | null = null
): ApiResponse<T> => {
    return {
        status,
        message,
        data,
    };
};

export const successResponse = <T>(data: T, message: string = "Success"): ApiResponse<T> => {
    return createResponse(200, message, data);
};

export const errorResponse = (message: string = "Error", status: number = 500): ApiResponse<null> => {
    return createResponse(status, message, null);
}; 