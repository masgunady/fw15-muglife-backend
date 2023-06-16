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

    if(err?.message === "delivery_method_not_found") {
        return response.status(404).json({
            success: false,
            message: "Delivery Method not Found"
        })
    }

    if(err?.message === "product_category_not_found") {
        return response.status(404).json({
            success: false,
            message: "Product Category not Found"
        })
    }

    if(err?.message === "add_category_failed") {
        return response.status(400).json({
            success: false,
            message: "Add category failed"
        })
    }

    console.log(err)
    return response.status(500).json({
        success: false,
        message: "Error: Internal server error",
    })
}

module.exports = errorHandler
