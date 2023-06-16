const errorHandler = (response, err) => {
    if(err?.message === "wrong_email") {
        return response.status(404).json({
            success: false,
            message: "Wrong Email"
        })
    }
    if(err?.message === "password_unmatch") {
        return response.status(404).json({
            success: false,
            message: "Password and confirm password does not match"
        })
    }
    console.log(err)
    return response.status(500).json({
        success: false,
        message: "Error: Internal server error",
    })
}

module.exports = errorHandler
