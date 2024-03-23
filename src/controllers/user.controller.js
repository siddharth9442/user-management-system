import { User } from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'

// Validation Functions
const validateName = (Name) => {
    if (typeof Name !== "string" || Name.length > 50) {
        return false;
    }else{
        return true;
    }
}

const validateEmail = (Email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(Email);
}

const validateAge = (Age) => {
    if(typeof Age !== 'number' || Age <= 18 || Age >= 100){
        return false;
    }else{
        return true;
    }
}

const validateGender = (Gender) => {
    const genders = ['male', 'female', 'other']

    const lowerCaseGender = Gender.toLowerCase()

    return genders.includes(lowerCaseGender)

}

const validateAddress = (Address) => {
    if (typeof Address !== "string" || Address.length >= 100) {
        return false;
    }else{
        return true;
    }
}

const validateMobileNo = (mobileNo) => {
    if (typeof mobileNo !== 'number' || mobileNo.toString().length !== 10) {
        return false;
    }else{
        return true;
    }
}

const createUser = async (req, res) => {
    // collectiong data
    const { Name, Email, Age, Gender, Address, mobileNo } = req.body

    // check all fields are non empty   
    if (
        [ Name, Email, Age, Gender, Address, mobileNo ].some(field => field === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // name validation
    if (!validateName(Name)) {
        throw new ApiError(400, 'Name must be string or maximum 50 characters long')
    }

    // email validation
    if (!validateEmail(Email)) {
        throw new ApiError(400, 'Invalid email')
    }

    // age validation
    if (!validateAge(Age)) {
        throw new ApiError(400, "Age must be between 18 and 100")
    }

    // gender validation
    if (!validateGender(Gender)) {
        throw new ApiError(400, "Gender must be male, female or other")
    }

    // address validation
    if (!validateAddress(Address)) {
        throw new ApiError(400, "Address must be maximum 100 characters long")
    }

    // mobile Validation
    if (!validateMobileNo(mobileNo)) {
        throw new ApiError(400, "Mobile number must be 10 digits")
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

    const { Name, Age, mobileNo, Address } = req.body

    // validation - non empty
    if (
        [Name, Age, Address, mobileNo].some(field => field === "")
    ) {
        throw new ApiError(400, "All fields are required")   
    }

    // name validation
    if (!validateName(Name)) {
        throw new ApiError(400, 'Name must be string or maximum 50 characters long')
    }

    // age validation
    if (!validateAge(Age)) {
        throw new ApiError(400, "Age must be between 18 and 100")
    }

    // address validation
    if (!validateAddress(Address)) {
        throw new ApiError(400, "Address must be maximum 100 characters long")
    }

    // mobile Validation
    if (!validateMobileNo(mobileNo)) {
        throw new ApiError(400, "Mobile number must be 10 digits")
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