export enum StatusCode {
    InputNotGiven = 400,
    Successful = 200,
    InternalServer = 500
}

export interface StatusResponse{
    msg : string
}
