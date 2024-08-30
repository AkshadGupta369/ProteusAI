class errorResponse extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
    }
}
module.exports=errorResponse;
//it is our customized error class which shows error message and status code;