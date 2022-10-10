import { Testimonial } from "../models/Testimoniales.js";

const guardarTestimonial = async(req, res)=>{

    const {nombre, correo, mensaje} = req.body;

    const errores = [];

    if(nombre.trim() === ''){
        errores.push({mensaje: 'El Nombre está vacio'});
    }

    if(correo.trim() === ''){
        errores.push({mensaje: 'El Correo está vacio'});
    }

    if(mensaje.trim() === ''){
        errores.push({mensaje: 'El Mensaje está vacío'});
    }

    if(errores.length > 0){
        const testimonial = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina : 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimonial
        });
    }else{
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });

            res.redirect('/testimoniales');
            
        } catch (error) {
            console.log(error);
            
        }

    }
};

export{
    guardarTestimonial
}