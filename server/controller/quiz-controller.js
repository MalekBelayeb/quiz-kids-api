var quizdb = require('../model/quiz-model');

// create and save new quiz
exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    // new Quiz
    const quiz = new quizdb({

        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        difficulty: req.body.difficulty,
        image: req.body.image

    })

    quiz
        .save()
        .then(data => {
            res.send(data)
                //res.redirect('/add-Quiz');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });
}


// retrieve and return all questions/ retrive and return a single question
exports.findById = (req, res) => {

    quizdb.findById(req.params.id).populate({ path: 'questions', populate: { path: 'answers' } })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found question with id " + id })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving question with id " + id })
        })


}

exports.findByCatId = (req, res) => {

    quizdb.find({ category: req.params.idCat }).populate({ path: 'questions', populate: { path: 'answers' } })
        .then(data => {

            if (!data) {

                res.status(404).send({ message: "Not found question with id " + id })

            } else {

                res.send({ quiz: data })

            }

        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving question with id " + id })
        })


}

exports.find = (req, res) => {
    quizdb.find().populate({ path: 'questions', populate: { path: 'answers' } })
        .then(quiz => {
            res.send(quiz)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error Occurred while retriving quiz information" })
        })

}



exports.addQuestionByQuizId = (req, res) => {
    quizdb.find()
        .then(quiz => {
            res.send(quiz)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error Occurred while retriving quiz information" })
        })

}


// Update a new idetified quiz by question id
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    quizdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update Quiz with ${id}. Maybe quiz not found!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update Quiz information" })
        })
}



// Delete a Quiz with specified Quiz id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    quizdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "Quiz was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Quiz with id=" + id
            });
        });
}


exports.addQuestionByQuizId = async(req, res) => {

    try {

        let quiz = await quizdb.findById(req.params.quizId)

        quiz.questions.push(req.body.questionId)
        await quiz.save()
        res.status(200).send(quiz)
    } catch (e) {
        console.log(e)
    }
}