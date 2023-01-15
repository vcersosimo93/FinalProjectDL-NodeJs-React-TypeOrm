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

