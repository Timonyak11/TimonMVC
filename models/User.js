const Database = require('../system/Database');
const bcrypt = require('../system/node_modules/bcryptjs');

class User extends Database{
    validateLoginForm(inputInfo){
        return (inputInfo.email == '' || inputInfo.password == '') ? 'invalid':'valid';
    }

    async validateRegisterForm(inputInfo){
        let message = [];
        let userExisted = await this.getUserByEmail(inputInfo.email);

        if(inputInfo.firstName == '' || inputInfo.lastName == '' || inputInfo.email == '' || inputInfo.password == '' || inputInfo.confirmPassword == ''){
            message.push('All fields must be filled!');
        } else if(!inputInfo.email.includes('@')){
            message.push('Invalid Email Format!');
        } else if(inputInfo.password.length < 8){
            message.push('Password must have atleast 8 characters!');
        }

        if(inputInfo.firstName.length < 2 || inputInfo.lastName.length < 2){
            message.push('First Name and Last Name must have atleast 2 characters');
        }
        if(inputInfo.password != inputInfo.confirmPassword){
            message.push('Password and Confirm Password does not match!');
        } 
        if(userExisted.length > 0){
            message.push('Email Already Taken!');
        }

        return message;
    }

    async getUserByEmail(user){
        let query = 'SELECT * FROM users WHERE email = ?';
        let values = [user];
        return await this.execQuery(query, values);
    }

    async validateLoginMatch(user, password){
        if(user.length > 0 && bcrypt.compareSync(password, user[0].password)) {
            return "success";
        }
        else { 
            return ["Incorrect email/password."];
        }
    }

    async getUserById(id){
        let query = 'SELECT * FROM users WHERE id = ?';
        let values = [id];
        return await this.execQuery(query, values);
    }

    async addUser(user){
        let query = 'INSERT INTO users (first_name, last_name, email, password, created_at) VALUES (?, ?, ?, ?, NOW())';
        user.password = bcrypt.hashSync(user.password, 10);
        let values = [user.firstName, user.lastName, user.email, user.password];
        let result = await this.execQuery(query, values);        
    }
}

module.exports = new User;
