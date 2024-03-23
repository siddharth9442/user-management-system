import { User } from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const createUser = async (req, res) => {
    // collectiong data
    const { Name, Email, Age, Gender, Address, mobileNo } = req.body

    // check all fields are non empty   
    if (
        [ Name, Email, Age, Gender, Address, mobileNo ].some(field => field === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // check if user is already exist
    const isUserExist = await User.findOne({Email})

    if (isUserExist) {
        throw new ApiError(409, "User with email already exist")
    }

    // creating user
    const user = await User.create({
        Name,
        Email,
        Age,
        Gender,
        Address,
        mobileNo,
    })

    if (!user) {
        throw new ApiError(500, "something went wrong while creating user")
    }

    // returning response
    return res
    .status(200)
    .json(new ApiResponse(200, user, "User created Successfully"))

}

const readUser = async (req, res) => {
    const { userId } = req.params

    const user = await User.findById(userId)

    if (!user) {
        throw new ApiError(404, "user not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, user, "user fetched successfully"))

}

const updateUser = async (req, res) => {
    const { userId } = req.params

    const { Name, Email, Age, mobileNo, Address } = req.body

    // validation - non empty
    if (
        [Name, Email, Age, Address, mobileNo].some(field => field === "")
    ) {
        throw new ApiError(400, "All fields are required")   
    }

    // check if user exists or not
    const user = await User.findById(userId)

    if (!user) {
        throw new ApiError(404, "user not found")
    }

    // updating user
    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
            $set: {
                Name,
                Email,
                Age,
                Address,
                mobileNo,
            }
        },
        {
            new: true
        }
    )

    if (!updatedUser) {
        throw new ApiError(500, "Error while updating user")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User details updated successfully"))

}

const deleteUser = async(req, res) => {
    const { userId } = req.params

    // check if user is exist or not
    const user = await User.findById(userId)

    if (!user) {
        throw new ApiError(404, "user not found")
    }
    // deleting user
    const isDeleted = await User.findOneAndDelete({ _id: user._id })


    if (!isDeleted) {
        throw new ApiError(500, "Error while deleting user")
    }
    
    return res
    .status(200)
    .json(new ApiResponse(200, {}, "user deleted successfully"))

}

export {
    createUser,
    readUser,
    updateUser,
    deleteUser,
}