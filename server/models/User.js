const mongoose=require('mongoose');


const UserSchema = mongoose.Schema(
    {
        name:
        {
            required:true,
            type:String
        },
        email:
        {
            required:true,
            type:String
        },
        password:
        {
            reequired:true,
            type:String
        }
    }
);


const UserModel = mongoose.model('User',UserSchema);

module.exports=UserModel