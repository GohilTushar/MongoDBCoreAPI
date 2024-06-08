const messageObject={
    user:{
        userExistError:"User Already Exist",
        userCreation:"user created successfully",
        serverError:"Internal Server Error",
        userNotExistError:"User Not Exist",
        successLogin:"LogIn Successful",
        failedLogin:"Invalid Credentials",
        noToken:"Access Denied: No Token Provided!",
        invalidToken:"Invalid Token",
        uploadTypeError:"Images Only!"
    },
    book:{
        userNotFoundError:"User Not Found!",
        bookCreation:"Book created successfully",
        serverError:"Internal Server Error",
        bookNotFoundError:"Book not found",
        exceedLimit:"Page number cannot be greater than total pages"
    }
}
const pageConstant={
    page:1,
    limit:10
}
export {messageObject,pageConstant}