export type FieldErrors = Record<string, string[] | string>;
export type PaginationMetadata = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ApiSuccessResponse<TData, TMeta = undefined> = {
  success: true;
  message: string;
  data: TData;
  meta?: TMeta;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  fieldErrors?: FieldErrors;
};

export type ApiResponse<TData, TMeta = undefined> =
  | ApiSuccessResponse<TData, TMeta>
  | ApiErrorResponse;
