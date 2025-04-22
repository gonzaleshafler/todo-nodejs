export class SignUpDto{
    constructor(public email : string, public password : string, public name : string) {
        this.email = this.validateEmail(email);
        this.password = this.validatePassword(password);
        this.name = name;
    }

      validateEmail(email : string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.toLowerCase())) {
          throw new Error('Invalid email format');
        }
        return email;
      }
      validatePassword(password : string)
      {
        if(password.length<8 || password.length>20)
            throw new Error('Password size error. Password must be between 8 and 20 characters');
        return password;
    }  
}