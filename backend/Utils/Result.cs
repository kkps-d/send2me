namespace backend.Utils
{
    public class Result<SuccessPayloadType, ErrorCodeType, ErrorPayloadType>
    {
        public bool IsSuccess { get; }
        public SuccessPayloadType? Payload { get; }
        public ErrorCodeType? ErrorCode { get; }
        public ErrorPayloadType? ErrorPayload { get; }

        private Result(SuccessPayloadType payload)
        {
            IsSuccess = true;
            Payload = payload;
            ErrorCode = default;
            ErrorPayload = default;
        }

        private Result(ErrorCodeType errorCode, ErrorPayloadType? errPayload)
        {
            IsSuccess = false;
            Payload = default;
            ErrorCode = errorCode;
            ErrorPayload = errPayload;
        }

        public static Result<SuccessPayloadType, ErrorCodeType, ErrorPayloadType> Success(SuccessPayloadType value) => new(value);
        public static Result<SuccessPayloadType, ErrorCodeType, ErrorPayloadType> Failure(ErrorCodeType errorCode, ErrorPayloadType? errPayload) => new(errorCode, errPayload);
    }
}
