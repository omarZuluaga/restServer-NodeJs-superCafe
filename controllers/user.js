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

const usuariosPost = async (req, res, next) => {

    try {
        const user = await userService.create(req.body);
        res.json({
            msg: 'post API - usuariosPost',
            user
        });

    } catch (error) {
        next(error);
    }

}

const usuariosPut = async (req, res, next) => {

    try {
        const { id } = req.params;
        const userUpdated = await userService.update(id, req.body);
        
        res.json({
            userUpdated
        });
    } catch (error) {
        next(error);
    }


}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, {isActive: false});

        res.json(user);
    } catch (error) {
        next(error);
    }

}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}