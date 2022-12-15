const userController = require('../Controllers/userController');
const {auth} = require('../middleware/auth')

const register = (app) => {
    app.post('/register', userController.register);
}

const login = (app) => {
    app.post('/login', userController.login);
}

const test = (app) => {
    app.post('/test', auth, (req, res) => {
        res.status(200).json({ message: 'verify success' })
    })
}

module.exports = (app) => {
    register(app),
        login(app),
        test(app)
}