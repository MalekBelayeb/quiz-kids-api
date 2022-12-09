var Userdb = require('../model/user-model');
var bcrypt = require('bcrypt');

// create and save new user
exports.create = async(req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt)

    const user = new Userdb({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
        status: req.body.status,
        score: req.body.score,
        trophe: req.body.trophe,
        //profileimage: req.files.photo[0].filename
    })

    // save user in the database
    user
        .save()
        .then(user => {

            res.status(200).send({ success: true, message: "", user: user._id })

        })
        .catch(err => {

            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });
}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res) => {

    Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error Occurred while retriving user information" })
        })


}

exports.findById = (req, res) => {
    const id = req.params.id;

    Userdb.findById(id).populate('badges')
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found user with id " + id })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Erro retrieving user with id " + id })
        })


}

// Update a new idetified user by user id
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update user information" })
        })


}


// Delete a user with specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "User was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}


exports.login = async(req, res) => {

    const { email, password } = req.body

    try {

        var user = await Userdb.findOne({ email })

        if (!user) {

            res.status(404).send({ success: false, message: "Invalid credential" })

        } else {

            if (await bcrypt.compareSync(password, user.password)) {
                res.status(200).send({ success: true, message: "User connected,", user: user._id })
            } else {
                res.status(404).send({ success: false, message: "Invalid credential" })
            }

        }

    } catch (e) {
        console.log(e)
        res.status(404).send({ message: "Something wrong happen" })
    }

}