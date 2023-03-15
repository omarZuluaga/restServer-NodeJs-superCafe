const UserService = require('../service/user.service');

const userService = new UserService();


const usuariosGet = async( req, res, next ) => {

    const {limit , offset } = req.query;
    //const query = { state: true }

    try {
        const users = await userService.findAll();
        res.json({
            users,
        });
        
    } catch (error) {
        next(error);
    }
    
    
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