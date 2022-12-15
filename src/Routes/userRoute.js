const userController = require('../Controllers/userController');

const register = (app) => {
    app.post('/register', userController.register);
}

const login = (app) => {
    app.post('/login', userController.login);
}

module.exports = (app) => {
    register(app),
    login(app)
}