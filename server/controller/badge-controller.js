var Badge = require('../model/badge-model');

exports.find = async(req, res) => {

    Badge.find()
        .then(badges => {
            res.status(200).send({ success: true, badges })
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

    const badge = new Badge({

        name: req.body.name,
        image: req.body.image,
        scoreCriteria: req.body.scoreCriteria

    })

    badge
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