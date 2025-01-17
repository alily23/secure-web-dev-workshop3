const User = require('./users.model')
const bcrypt = require('bcrypt')

async function register (username, password) {
    const hash = await bcrypt.hash(password, 10)
    const user = new User({username, password: hash})
    return await user.save()
}

async function checkPassword (username, password) {
    const user = await User.findOne({ username })
    if (!user) {return false}
    const match = await bcrypt.compare(password, user.password)
    if(!match) {
        return false
    }
    return user
}

module.exports = {register, checkPassword}