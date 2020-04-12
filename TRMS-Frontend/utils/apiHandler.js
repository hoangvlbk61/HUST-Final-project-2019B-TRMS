const ERROR_CODE = [
    { 
        msg: "Successful",
        code: 200
    }, 
    { 
        msg: "Created Successful",
        code: 201
    }, 
    { 
        msg: "Bad request",
        code: 400
    }, 
    { 
        msg: "Unauthorized",
        code: 401
    }, 
    { 
        msg: "Forbidden",
        code: 403
    }, 
    { 
        msg: "Page not Found",
        code: 404
    }, 
    { 
        msg: "Time out",
        code: 408
    }, 
    { 
        msg: "Internal error",
        code: 500
    }, 
    { 
        msg: "Bad gateway",
        code: 502
    }, 
    { 
        msg: "Gateway timeout",
        code: 504
    }, 
]

export const errorHandler = (type, code) => {
    return  {
        ...ERROR_CODE.find(e => e.code === code),
        type,
    };
}