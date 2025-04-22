
export class SignInDto{
    constructor(public email : string, public password : string) {
        this.email = this.validateEmail(email);
        this.password = password;
      }

      validateEmail(email : string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;console.log("SADASDAAAAAAAAAAAAAAAAAA");
        if (!emailRegex.test(email.toLowerCase())) {
          
          throw new Error('Invalid email format');
        }
        return email;
      }  

}