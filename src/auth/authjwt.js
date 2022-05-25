const db = require('../models')
const User = db.users

module.exports = {

    checkUser: async(req, res, next) => {

        try {
            const user = await new User();
            //    console.log(req.headers['authorization'])
            //console.log(user)
            user.verifyToken(req.headers['authorization'], (valid) => {
                if (valid) {
                    req.userParams = valid;
                    return next();
                }
                next();
            })
        } catch (err) {
            return res.status(401).send({ success: false, msg: "Not_Login", error: err.message });
        }
    },


    commonAuth: (req, res, next) => {

        try {
            if (!req.headers['authorization'] || req.headers['authorization'] === 'undefined') {
                return res.status(401).send({ success: false, msg: "Not_Login" });
            }
            const user = new User();
            //    console.log(req.headers['authorization'])
            user.verifyToken(req.headers['authorization'], (valid) => {
                if (!valid) {
                    return res.status(401).send({ success: false, msg: "Unauthorise" });
                } else {
                    req.userParams = valid;
                    let query = { id: valid.id };
                    console.log(query, '-----------')

                    User.findOne(query).then((data) => {
                        if (!data) {
                            return res.status(401).send({ success: false, msg: "Unauthorise" });
                        } else {
                            next();
                        }
                    }).catch(err => {
                        return res.status(500).send({ success: false, error: err.message, msg: 'somethig wrong' });
                    });

                }


            })
        } catch (err) {
            return res.status(401).send({ success: false, msg: "Not_Login" });
        }
    },
    /*
        isAuthclient: (req, res, next) => {

            try {
                if (!req.headers['authorization'] || req.headers['authorization'] === 'undefined') {
                    return res.status(401).send({ success: false, msg: 'Not_Login' });
                }
                const user = new User();
                //    console.log(req.headers['authorization'])
                user.verifyToken(req.headers['authorization'], (valid) => {
                    if (!valid) {
                        return res.status(401).send({ success: false, msg: 'Unauthorise' });
                    } else {
                        req.userParams = valid;
                        let query = { id: valid.id, client_id: valid.client_id };
                        console.log(query, "kkdkdkd");
                        if (valid.user_type == 'customer') {
                            User.findOne(query).then((data) => {
                                if (!data) {
                                    return res.status(401).send({ success: false, msg: 'Unauthorise' });
                                } else {
                                    next();
                                }
                            }).catch(err => {
                                return res.status(500).send({ success: false, error: err.message, msg: 'something wrong' });
                            });
                        } else {
                            return res.status(401).send({ success: false, msg: 'Unauthorise' });
                        }
                    }


                })
            } catch (err) {
                return res.status(401).send({ success: false, msg: 'Not_Login' });
            }
        },
    */

}