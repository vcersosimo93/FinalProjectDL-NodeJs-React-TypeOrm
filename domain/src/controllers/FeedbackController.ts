import { AppDataSource } from "../data-source"
import { Feedback } from "../entity/Feedback"

const manager = AppDataSource.manager

export const getFeedbacks = async (req,res) => {
    try {
        const feedbacks = await manager.find(Feedback);
        return res.json(feedbacks);
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


export const createFeedback = async (req, res, next) => {

    const coment = req.body.comentario;
    const fecha = new Date();
    const persona = req.body.empleadoId;

    try {
        const feedback = new Feedback();
        feedback.comentario = coment
        feedback.fecha = fecha
        await manager.save(feedback)
        res.status(201).json({
            message: 'Menu creado exitosamente.',
            post: { comentario: coment}
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

