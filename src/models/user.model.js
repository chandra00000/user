const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const bcrypt = require("bcryptjs");
const secret = require('../configs/secret')
module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {
        first_name: { type: DataTypes.STRING, allowNull: true },
        last_name: { type: DataTypes.STRING, allowNull: true },
        password: { type: DataTypes.STRING, allowNull: true },
        email: {
            type: DataTypes.STRING,
            unique: true,
            isEmail: true,
            allowNull: false,
            validate: {
                isEmail: { msg: "It must be a valid Email ... address" },

            },

        },
        phone: { type: DataTypes.STRING, allowNull: true },
        pincode: { type: DataTypes.STRING, allowNull: true },
        //  city: { type: DataTypes.STRING, allowNull: true },
        city_id: { type: DataTypes.STRING, allowNull: true },
        state_id: { type: DataTypes.INTEGER, allowNull: true },
        country_id: { type: DataTypes.INTEGER, allowNull: true },
        client_id: { type: DataTypes.INTEGER, allowNull: true },
        status: { type: DataTypes.ENUM('Active', 'Inactive'), defaultValue: 'Active', allowNull: false, },
        address: { type: DataTypes.STRING, allowNull: true },
        user_type: { type: DataTypes.STRING, allowNull: true },
        password_reset_token: { type: DataTypes.STRING, allowNull: true },
        // role_id: { type: DataTypes.INTEGER, allowNull: true },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }

    })



    User.prototype.generateJwt = function() {
        return jwt.sign({
            id: this.id,
            email: this.email,
            user_type: this.user_type,
            client_id: this.client_id
        }, secret.secretKey, {
            expiresIn: '1h'
        });
    };

    User.prototype.verifyToken = function(token, callback) {
        if (!token) {
            return callback(false);
        }
        token = token.split(' ')[1]
        jwt.verify(token, secret.secretKey, function(err, dcode) {
            if (err) {
                return callback(false);
            } else {
                return callback(dcode);
            }
        })
    }
    User.prototype.passwordResetJwt = function() {
        return jwt.sign({
            id: this.id,
            email: this.email
        }, secret.passwordSecret, {
            expiresIn: '1h'
        });
    };
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };


    return User

}