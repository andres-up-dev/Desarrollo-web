import mongoose from "mongoose";

const USR_ROLES = ['User', 'Admin', 'Superuser']

const UserSchema = new mongoose.Schema(
    {
        username: {type:String, required: true, unique: true, trim:true},
        name: { type: String, required: true },
        email: { type: String, required: true, trim: true },
        password: { type: String, required: true, trim: true},
        role: { type: USR_ROLES, default: "user" },
    }, {
        timestamps: true    
    }
);

export default mongoose.model("User", UserSchema);