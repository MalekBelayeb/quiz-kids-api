const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('router', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

exports.add_user = (req, res) =>{
    res.render('add_user');
}

exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })

}



exports.add_quiz = (req, res) =>{
            res.render('add_quiz');
        }

/*exports.add_image= (req, res) =>{
            res.render('add_image');
        }*/
exports.update_quiz = (req, res) =>{
            axios.get('http://localhost:3000/api/quiz', { params : { id : req.query.id }})
                .then(function(quizdata){
                    res.render("update_quiz", { quiz : quizdata.data})
                })
                .catch(err =>{
                    res.send(err);
                })
}