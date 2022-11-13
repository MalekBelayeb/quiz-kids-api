var quizdb = require('../model/quiz-model');

// create and save new quiz
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

   
    console.log(req.files.photo[0].filename)
    // new Quiz
    const quiz = new quizdb({
        quiz : req.body.quiz,
        category : req.body.category,
        answer1:req.body.answer1,
        answer2 : req.body.answer2,
        answer3 : req.body.answer3,
        answer4:req.body.answer4,
        image:req.files.photo[0].filename
    })

    quiz
    .save()
    .then(data => {
        //res.send(data)
        res.redirect('/add-Quiz');
    })
    .catch(err =>{
        res.status(500).send({
            message : err.message || "Some error occurred while creating a create operation"
        });
    });
}


// retrieve and return all questions/ retrive and return a single question
exports.findById = (req, res)=>{

    quizdb.findById(req.params.id)
    .then(data =>{
        if(!data){
            res.status(404).send({ message : "Not found question with id "+ id})
        }else{
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({ message: "Error retrieving question with id " + id})
    })

    
}

exports.find = (req, res)=>{
    quizdb.find()
    .then(quiz => {
        res.send(quiz)
    })
    .catch(err => {
        res.status(500).send({ message : err.message || "Error Occurred while retriving quiz information" })
    })
    
}



// Update a new idetified quiz by question id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    quizdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update Quiz with ${id}. Maybe quiz not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update Quiz information"})
        })
}



// Delete a Quiz with specified Quiz id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    quizdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Quiz was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete Quiz with id=" + id
            });
        });
}