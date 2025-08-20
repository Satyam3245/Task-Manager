export enum StatusCode {
    InputNotGiven = 400,
    Successful = 200,
    InternalServer = 500,
    UserExist = 409,
    Unauthorized  = 401,
    LackInput = 403
}

export interface StatusResponse{
    msg : string
}
export interface SignInBody {
    email : string,
    name : string,
    password : string
}
export interface LoginBody {
    email : string,
    password : string
}
export interface User {
    name : string,
    email : string,
    password : string
}
export interface returnInfo {
    email : string,
    id : string
}


export interface CreateUserResult {
    data? : returnInfo,
    error? : string
}
