var Category = require('../model/category-model');


exports.find = (req, res) => {
    Category.find()
        .then(categories => {
            res.status(200).send({ success: true, categories })
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error Occurred while retriving category information" })
        })

}

exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }
    console.log(req.body)
    // new Quiz
    const quiz = new Category({

        category: req.body.category,
        image: req.body.image
    })
    
    quiz
        .save()
        .then(data => {
            res.send({ success: true, status: 200, data })
            //res.redirect('/add-Quiz');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });
}