const db = require('../models')
const config = require('../configs/secret')
var jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");
const _lodash = require('lodash');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// create main Model

const User = db.users
const Citie = db.cities
module.exports = {
    addUser: async(req, res) => {
        try {
            let reqData = req.body ? req.body : {};
            // const client_id = req.userParams.client_id;
            // req.body.client_id = client_id;
            // const exist = await User.findOne({ where: { email: reqData.email } });
            // if (exist) {
            //     return res.status(401).json({ success: false, msg: "Email_Exist" })
            // }
            let user = new User(reqData);
            // generate salt to hash password
            const salt = await bcrypt.genSalt(10);
            // now we set user password to hashed password
            // user.password = await bcrypt.hash(user.password, salt);
            let passwordData = Math.random().toString(36).slice(2, 8);
            user.password = passwordData
            user.password = await bcrypt.hash(user.password, salt);
            let data = await user.save();
            data = {
                email: user.email,
                password: passwordData
            }
            res.send({ success: true, data, message: "User Added Successfully!" });

        } catch (err) {
            return res.status(500).send({ success: false, message: err.message });
        }
    },

    Update: async(req, res) => {
        try {
            const { user_id } = req.params;
            //  const user_id = req.userParams.id;
            const { first_name, last_name, phone, pincode, city_id, state_id, country_id, user_type } = req.body
            if (!user_id) {
                return res.status(422).json({ success: false, msg: "user missing" })
            }
            const exist = await User.findOne({ where: { id: user_id } });
            if (!exist) {
                return res.status(404).json({ success: false, msg: "user not exist" })
            }

            const update = await User.update({ first_name, last_name, phone, pincode, city_id, state_id, country_id, user_type }, { where: { id: user_id } });
            // if (!update) {
            //     return res.status(500).json({ success: false, msg: "Something_Went_Wrong", })
            // }
            return res.status(200).json({ success: true, message: "User updated sucessfully" })
                // }
        } catch (err) {
            console.log(err)
            return res.status(500).json({ success: false, error: err, msg: "Something_Went_Wrong" })
        }



    },


    delete: async(req, res) => {
        try {
            const { user_id } = req.params
            if (!user_id) {
                return res.status(422).json({ success: false, msg: "user missing" })
            }
            const exist = await User.findOne({ where: { id: user_id } });
            if (!exist) {
                return res.status(404).json({ success: false, msg: "user not exist" })
            }
            const data = await User.update({ deletedAt: Date() }, { where: { id: user_id } });
            return res.status(200).json({ success: true, msg: "delete user sucessfully" })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ success: false, error: err.message, msg: "Something_Went_Wrong" })
        }
    },

    viewUser: async(req, res) => {
        try {
            const { user_id } = req.params
            if (!user_id) {
                return res.status(422).json({ success: false, msg: "tour missing" })
            }
            const exist = await User.findOne({ where: { id: user_id } });
            if (!exist) {
                return res.status(404).json({ success: false, msg: "user not exist" })
            }
            const data = await User.findOne({ attributes: { exclude: ['password'] }, where: { id: user_id } });
            return res.status(200).json({ data, msg: "view user successfully" })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ success: false, error: err, msg: "Something_Went_Wrong" })
        }
    },

    getAll: async(req, res) => {

        let limit = 10,
            skip = 0
        let search = req.query.s;
         let   sort_by = req.query.sb;
         let   sort_dir = req.query.sd;
          let  page_number = req.query.p;
	  let	status = req.query.status;
      
        //all null sort_by,sort_dir,page_number
        if (_lodash.isEmpty(sort_by) && _lodash.isEmpty(sort_dir) && _lodash.isEmpty(page_number)) {
            sort_by = 'id'
            sort_dir = 'DESC'
            page_number = 1
        } else if (_lodash.isEmpty(sort_by) && !_lodash.isEmpty(sort_dir) && _lodash.isEmpty(page_number)) {
            sort_by = 'id'
            page_number = 1
        } else if (_lodash.isEmpty(sort_by) && !_lodash.isEmpty(sort_dir) && !_lodash.isEmpty(page_number)) {
            sort_by = 'id'
        } else if (!_lodash.isEmpty(sort_by) && _lodash.isEmpty(sort_dir) && !_lodash.isEmpty(page_number)) {
            sort_dir = 'DESC'
        } else if (_lodash.isEmpty(sort_by) && _lodash.isEmpty(sort_dir) && !_lodash.isEmpty(page_number)) {
            sort_by = 'id'
            sort_dir = 'DESC'
        } else if (!_lodash.isEmpty(sort_by) && !_lodash.isEmpty(sort_dir) && _lodash.isEmpty(page_number)) {
            page_number = 1
        }
        if (_lodash.isEmpty(search)) {
            search = ''
        }
		 if (_lodash.isEmpty(status)) {
            status = 'Active'
        }
    
        skip = page_number * limit - limit;
        limit = limit

        try {

            let data = await User.findAndCountAll({

                  
                    where: {
                        [Op.or]: [{
                           
                            first_name: {
                                [Op.like]: `%${search}%`
                            },
                           


                        },{
                           
                            
                            last_name: {
                                [Op.like]: `%${search}%`
                            },
                           


                        }],
                        deletedAt: null,
                        status:status
                    },

                    order: [
                        [sort_by, sort_dir],
                    ],
                    offset: skip,
                    limit: limit,
                })
                // console.log(data[0].location_point)
                //  console.log(JSON.parse(data), '==========================')
            return res.status(200).json({ success: true, data, msg: "User List " })
        } catch (err) {
            return res.status(500).json({ success: false, error: err.message })
        }

    

    },

    user_status: async(req, res) => {
        try {
            const { user_id, status } = req.params;
            if (!user_id) {
                return res.status(404).json({ success: false, message: "User not exist" })
            }

            const data = await User.update({ status: status }, { where: { id: user_id } })
            console.log(data, '---------------------------')
            if (status == "Inactive") {
                return res.status(200).json({ sucess: true, message: "Status Deactivate Successfully" })
            } else {
                return res.status(200).json({ sucess: true, message: "Status Activate Successfully" })

            }

        } catch (err) {
            return res.status(500).json({ success: false, error: err.message, message: "Something_Went_Wrong" })
        }

    }





}