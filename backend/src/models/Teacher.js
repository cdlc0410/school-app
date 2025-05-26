// backend/src/models/Teacher.js
import mongoose from "mongoose";
import Room from "./Room";

const TeacherSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    dob: { // Date of Birth
        type: Date,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    yearsOfExperience: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    classes: [{
        type: ObjectId,
        ref: Room
    }]
});

const Teacher = mongoose.model('Teacher', TeacherSchema);

export default Teacher;