const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testdb')
.then(() => console.log("Connected to Database"))
.catch((err) =>  console.log("Not Connected to Database ERROR! ", err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});
const Course = mongoose.model('book', courseSchema);
async function setCourse(){
    const course = new Course({
        name: 'ark',
        author: 'mohamed',
        tags: ['survive', 'tema'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}
setCourse();
async function getCourse(){
    const courses = await Course
        .find({author: 'mohamed', isPublished: true})
        .sort({name: 1})
        .select({name: 1, tags: 1});
    console.log(courses);
}
getCourse()