var Question = require('../model/question-model');

exports.create = (req, res) => {

    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    // new Quiz
    const question = new Question({

        question: req.body.question,

    })

    question
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

exports.find = (req, res) => {

    Question.find()
        .then(question => {
            res.send(question)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error Occurred while retriving quiz information" })
        })

}

exports.findById = (req, res) => {

    Question.findById(req.params.quizId)
        .then(question => {
            res.send(question)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error Occurred while retriving quiz information" })
        })

}

exports.addAnswersByQuestionId = async(req, res) => {

    try {

        let question = await Question.findById(req.params.questionId)

        question.answers.push(req.body.answerId)
        await question.save()
        res.status(200).send(question)
    } catch (e) {
        console.log(e)
    }
}