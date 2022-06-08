const User = require('../models/user')

const createAdminAccount = async(){
    try {
    const existingUser = await User.find({mobile : process.env.ADMIN_MOBILE, email : ADMIN_EMAIL});

    if(existingUser)
        return ;

    const userData = {
        name: "Admin",
        email:process.env.ADMIN_EMAIL,
        mobile:process.env.ADMIN_MOBILE,
        password : process.env.ADMIN_PASSWORD,
        DOB: "1 Jan 2000"
    }
    await userData.save();
    } catch (e) {
        console.log(e)
    }
}

createAdminAccount();
