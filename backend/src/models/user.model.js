import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema=new mongoose.Schema({
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Role',
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:['^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$','Invalid email format.']
    },

    password:{
        type:String,
        required:true //will be stored as a hash using bcrypt.
    },
    role:{
        type:String,
        enum:['admin','staff'],
        required:true
    },
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
},{timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true},}
);

userSchema.virtual('fullname').get(function(){
    return `${this.firstname} ${this.lastname}`;
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    try{
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
        next();
    }catch(err){
        next(err);
    }
})



const User=mongoose.model('User',userSchema);

export default User;
