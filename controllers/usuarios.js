const { response, request } = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');


const usuariosGet = async( req, res ) => {

    const {limit , offset } = req.query;
    const query = { state: true }
    const users = await User.find( query )
        .limit(Number(limit))
        .skip(Number(offset));

    res.json({
        users,
    });
}

const usuariosPost = async (req, res) => {

    const {username, email, password, role} = req.body;
    const user = new User({ username, email, password, role });

    const salt = bcrypt.genSaltSync();

    user.password = bcrypt.hashSync( password, salt );

    await user.save();

    res.json({
        msg: 'post API - usuariosPost',
        user
    });
}

const usuariosPut = async (req, res) => {

    const { id } = req.params;
    const { password, google, ...others} = req.body;

    if( password ) { 
        const salt = bcrypt.genSaltSync();

        others.password = bcrypt.hashSync( password, salt );
    }

    const userUpdated = await User.findByIdAndUpdate(id, others); 

    res.json({
        userUpdated
    });
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res) => {

    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, {isActive: false});

    res.json(user);
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}