const mongoose=require("mongoose");
const studentSchema=new mongoose.Schema({
    name: {
    type: String,
    required: true
},
     email: {
    type: String,
    required: true,
    unique: true
},
rollNo: { type: String, required: true, unique: true },
    year: {
    type: Number,
    required: true
},
    mobile: {
    type: String,
    required: true
},
    branch: {
    type: String,
    required: true
},
    cgpa: {
    type: Number,
    required: true
},
    
});
module.exports = mongoose.model("Student", studentSchema);