async function getObjectSwaggerUI(swaggerUtil){
    swaggerUtil.addPath(
        '/api/v2/auth/create-object',
        'Page layout creation',
        {
          type:{
            type:'string',
            default:'',
          },
          body:{
            type:'string',
            default:'',
          },
        },
        'post',
      );
}
export {getObjectSwaggerUI}