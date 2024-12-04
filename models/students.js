import mongoose from "mongoose";
const { Schema ,model} = mongoose;
const studentSchema = new Schema({
    IDCard: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: "Anonymous"
    },
    phone : {
        type: Number,
    },
    classId :{
        type: Schema.Types.ObjectId,ref:'class'
    },
    
}, {
	timestamps: true,
});
const Students = model('Students', studentSchema);
export default Students;