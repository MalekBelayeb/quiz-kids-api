var Category = require('../model/category-model');
const User = require('../model/user-model');


exports.find = async(req, res) => {

    try {

        let idUser = req.params.id;
        let user = await User.findById(idUser)

        let categories = await Category.aggregate([{
            $lookup: {
                from: "quizzes",
                localField: "_id",
                foreignField: "category",
                as: "quiz",
            },
        }]).exec()

        categories = categories.map((item) => {

            item.quizCount = item.quiz.length
            item.locked = user.globalScore < item.requiredPoints
            return item

        });

        res.status(200).send({ success: true, categories })

    } catch (err) {

        res.status(500).send({ success: false, message: err.message || "Error Occurred while retriving category information" })

    }

}

exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    // new Quiz
    const quiz = new Category({
        requiredPoints: req.body.requiredPoints,
        category: req.body.category,
        image: req.body.image

    })

    quiz
        .save()
        .then(data => {

            res.send({ success: true, status: 200, data })

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });
}