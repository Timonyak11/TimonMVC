const User = require('../models/User');

class Users{
    index(request, response){   
        if(request.session.user_id){
            response.redirect('/profile');
            return;
        }

        let error_message = null;
        let success_message = null;
        let prevRegData = null;
        if(request.session.errors || request.session.success){
            error_message = request.session.errors; 
            prevRegData = request.session.registerInput;
            success_message = request.session.success;
            delete request.session.errors;
            delete request.session.success;
            delete request.session.registerInput;
        }

        response.render('index', {errors: error_message, success: success_message, regData: prevRegData});
    }

    async loginProcess(request, response){
        let result = User.validateLoginForm(request.body);

        if(result == 'invalid'){
            request.session.errors = ['All fields must be filled!'];
            response.redirect('/');
        } else{
            let user = await User.getUserByEmail(request.body.email);
            let result = await User.validateLoginMatch(user, request.body.password);
            if(result == 'success'){
                request.session.user_id = user[0].id;
                response.redirect('/profile');
            } else{
                request.session.errors = result;
                response.redirect('/');
            }
        }
    }

    async profile(request, response){
        if(!request.session.user_id){
            response.redirect('/');
            return;
        }

        let user = await User.getUserById(request.session.user_id);
        response.render('profile', {data: user});
    }

    async registerProcess(request, response){
        let result = await User.validateRegisterForm(request.body);
        if(result.length > 0){
            request.session.errors = result;
            request.session.registerInput = request.body;
            response.redirect('/');
        } else{
            await User.addUser(request.body);
            request.session.success = 'User Addedd Successfully!';
            response.redirect('/');
        }
    }

    logoff(request, response){
        request.session.destroy();
        response.redirect('/');
    }
}

module.exports = new Users;
