const nconf = require("nconf")
const mongoose = require("mongoose")
const isEmail = require("validator/lib/isEmail")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!isEmail(value)) {
                throw new Error({ error: "Invalid email address"})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id}, nconf.get("JWT_KEY"))
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username })
    if (!user) {
        throw new Error("Invalid login credentials")
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password)
    if (!isPasswordMatching) {
        throw new Error("Invalid login credentials")
    }
    return user
}

const User = mongoose.model("User", userSchema)

module.exports = User