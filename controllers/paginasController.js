import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimoniales.js";

const paginaInicio = async (req, res)=>{ // req : Lo que enviamos - res : lo que espress nos responde

    const promiseDB = [];

    promiseDB.push(Viaje.findAll({limit: 3}));
    promiseDB.push(Testimonial.findAll({limit: 3}));

    try {
        const resultado = await Promise.all(promiseDB);

        res.render('inicio',{
            pagina : 'Inicio',
            clase : 'home',
            viajes: resultado[0],
            testimonial: resultado[1]
        });        
    } catch (error) {
        console.log(error);        
    }    
};

const paginaNosotros = (req, res)=>{ // req : Lo que enviamos - res : lo que espress nos responde
    res.render('nosotros',{
        pagina : 'Nosotros'
    });
};

const paginaViajes = async(req, res)=>{ // req : Lo que enviamos - res : lo que espress nos responde
    const viajes = await Viaje.findAll();

    res.render('viajes',{
        pagina : 'Próximos Viajes',
        viajes
    });
};

const paginaTestimoniales = async(req, res)=>{ // req : Lo que enviamos - res : lo que espress nos responde
    try {
        const testimonial = await Testimonial.findAll();

        res.render('testimoniales',{
            pagina : 'Testimoniales',
            testimonial
        });
    } catch (error) {
        console.log(error);        
    }
};

const paginaDetalleViaje = async(req, res)=>{
    const {slug} = req.params;
    
    try {
        const viaje = await Viaje.findOne({where: {slug}});
        res.render('viaje', {
            pagina: 'Información Viaje',
            viaje
        });
    } catch (error) {
        console.log(error);
    }

}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}