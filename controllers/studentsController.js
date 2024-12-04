import mongoose from "mongoose";
import Students from "../models/students.js";    

const createstudents = async (req,res) => {
    try {
        const { name, IDCard, email, phone, classId: bodyClassId } = req.body; 
        const { id: paramClassId } = req.params; 
        const classId = paramClassId || bodyClassId; 
    
        if (!classId) {
            throw new Error("Class ID is required.");
        }
    
        const newStudent = await Students.create({
            IDCard,
            name,
            email,
            phone,
            classId,
        });
    
        console.log("Student Created:", newStudent);
        res.status(201).json({ message: "Student created successfully", student: newStudent });
    } catch (err) {
        console.error("Error creating student:", err);
        res.status(500).json({ error: "Error creating student", details: err.message });
    }
    
};

const allStudents = async () => {
    try {
        const students = await Students.find();
        console.log("All students:", students);
    } catch (err) {
        console.error("Error reading students:", err);
    }
};

const StudentsById = async (req,res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({ message: "Student not found" });
        }
        const students = await Students.findById(id);
        if (students) {
            console.log("student Found:", students);
        } else {
            console.log("student not found.");
        }
    } catch (err) {
        console.error("Error reading student:", err);
    }
};

const updateStudents = async (req,res) => {
    try {
        const {id}=req.params;
        const {name,email,phone,classId}=req.body;
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({ message: "Student not found" });
        }
        const updatedStudents = await Students.findByIdAndUpdate(name,email,phone,classId, { new: true });
        if (updatedStudents) {
            console.log("student Updated:", updatedStudents);
        } else {
            console.log("student not found for update.");
        }
    } catch (err) {
        console.error("Error updating student:", err);
    }
};

const deleteStudents = async (req,res) => {
    try {
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({ message: "Student not found" });
        }
        const deleteStudents = await Students.findByIdAndDelete(id);
        if (deleteStudents) {
            console.log("student Deleted:", deleteStudents);
        } else {
            console.log("student not found for deletion.");
        }
    } catch (err) {
        console.error("Error deleting student:", err);
    }
};


export default { createstudents, allStudents , StudentsById ,updateStudents , deleteStudents };



