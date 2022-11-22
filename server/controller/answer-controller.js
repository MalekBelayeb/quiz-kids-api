var Answer = require('../model/answer-model');

exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    // new Quiz
    const answer = new Answer({

        answer: req.body.answer,
        score: req.body.score,
        isCorrect: req.body.isCorrect,

    })

    answer.save().then(data => {

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

    Answer.find()
        .then(answers => {
            res.send(answers)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error Occurred while retriving quiz information" })
        })

}