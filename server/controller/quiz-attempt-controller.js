var QuizAttempt = require('../model/quiz-attempt-model');
var QuestionAttempt = require('../model/question-attempt-model');
var User = require('../model/user-model');
const Badge = require('../model/badge-model');


exports.addQuizAttempt = async(req, res) => {

    try {

        let { quizId, userId } = req.body

        const foundQuizAttempt = await QuizAttempt.findOne({ quiz: quizId, user: userId })

        if (foundQuizAttempt) await foundQuizAttempt.delete()

        const quizAttempt = new QuizAttempt({
            quiz: quizId,
            user: userId
        })

        let user = await User.findById(userId)

        let alreadyPlayed = user.playedQuiz.includes(quizId)
        
        let newQuizAttempt = await quizAttempt.save()
        let result = { id:newQuizAttempt.id,quiz:newQuizAttempt.quiz,user:newQuizAttempt.user,alreadyPlayed }
        console.log(result)
        res.status(200).json(result)

    } catch (e) {
        console.log(e)
    }

}

exports.find = async(req, res) => {

    try {
        let user = req.params.user;
        const attempts = await QuizAttempt.find({ user }).populate({ path: "questions", populate: { path: 'question', populate: { path: "answers" } } }).populate({ path: "quiz", populate: { path: "category" } })

        res.status(200).send({ attempts })

    } catch (e) {

    }

}

exports.addQuestionAttemptToQuizAttempt = async(req, res) => {

    try {

        let { questionId, userId, quizAttemptId, userAnswer } = req.body

        const questionAttempt = new QuestionAttempt({
            question: questionId,
            user: userId,
            userAnswer: userAnswer
        })

        let newQuestionAttempt = await questionAttempt.save()

        const quizAttempt = await QuizAttempt.findById(quizAttemptId)

        quizAttempt.questions.push(newQuestionAttempt._id)

        await quizAttempt.save()

        res.status(200).send({ success: true, message: "" })

    } catch (e) {

    }

}


exports.finishQuiz = async(req, res) => {

    try {

        let { quizAttemptId } = req.body

        const quizAttempt = await QuizAttempt.findById(quizAttemptId).populate({ path: 'questions', populate: { path: 'userAnswer' } })
        if (!quizAttempt) return res.status(404).end()

        const user = await User.findById(quizAttempt.user)
        if (!user) return res.status(404).end()
        console.log(quizAttempt)

        if (user.playedQuiz.includes(quizAttempt.quiz)) return res.status(404).send("Quiz already played")

        let total = 0

        quizAttempt.questions.forEach(element => {

            total += element.userAnswer.score

        });

        user.globalScore += total

        user.playedQuiz.push(quizAttempt.quiz)

        var gainedBadges = await Badge.find({ scoreCriteria: { $lte: user.globalScore } }).select("_id")

        user.badges = gainedBadges
        await user.save()

        res.status(200).send({ success: true, message: quizAttempt })

    } catch (e) {
        console.log(e)
    }

}