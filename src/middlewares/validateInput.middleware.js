import { body, validationResult } from 'express-validator'
import { ApiError } from '../utils/ApiError.js'

export const validateName = async (req, res, next) => {
    const { Name } = req.body

    if (typeof(Name) !== 'string') {
        throw new ApiError(400, "Name must be string value")
    }

    if (Name.length > 50) {
        throw new ApiError(400, "Name exeeded length of 50 characters")
    }

    return next()
}