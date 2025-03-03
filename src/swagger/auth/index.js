async function geAuthSwaggerUI(swaggerUtil){
    swaggerUtil.addPath(
        '/api/v2/user-register',
        'User Register API',
        {
          firstName:{
            type:'string',
            default:''
          },
          lastName:{
            type:'string',
            default:''
          },
          email: {
            type: 'string',
            default: '',
          },
          password: {
            type: 'string',
            default: '',
          },
          role: {
            type: 'string',
            default: 'USER',
          },
        },
        'post',
      );  
      
      swaggerUtil.addPath(
        '/api/v2/user-login',
        'User Login API',
        {
          email: {
            type: 'string',
            default: 'tim@gmail.com',
          },
          password: {
            type: 'string',
            default: '11111',
          },
        },
        'post',
      );  
      
      
      swaggerUtil.addPath(
        '/api/v2/auth/user-info',
        'User Details API',
        {
           
        },
        'post',
      );


      swaggerUtil.addPath(
        '/api/v2/auth/change-password',
        'User can change password',
        {
            password: {
                type: 'string',
                default: '',
              },
            confirmPassword: {
                type: 'string',
                default: '',
              },
        },
        'post',
      );
      

      swaggerUtil.addPath(
        '/api/v2/auth/logout',
        'User Logout API',
        {
         
        },
        'post',
      );
}

export {geAuthSwaggerUI}