const validateAuthor = (request, response, next) => {
    const errors = [];

    const {
        name,
        surname,
        email,
        password,
        birthday,
    } = request.body;

    if(typeof name !== 'string') {
        errors.push('name must be a string')
    }
    if(typeof surname !== 'string') {
        errors.push('surname must be a string')
    }
    if(typeof email !== 'string') {
        errors.push('email must be a string')
    }
    if(typeof password !== 'string' || password.length < 4) {
        errors.push('password must be a string whit min 4 char')
    }
    if(typeof birthday !== 'string') {
        errors.push('birthday must be a string')
    }

    if(errors.length > 0) {
        response.status(400).send({errors})
    } else {
        next()
    }
}

module.exports= validateAuthor;