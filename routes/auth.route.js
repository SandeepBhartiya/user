const authController=require('../controllers/auth.controller');

module.exports=(app)=>{
    app.post('/user/api/v1/signUp',authController.signUp);
    app.post('/user/api/v1/signIn',authController.signIn);
}