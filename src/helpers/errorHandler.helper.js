const errorHandler = (response, err) => {
    if(err?.message === "wrong_password") {
        return response.status(400).json({
            success: false,
            message: "Wrong Password"
        })
    }
    if(err?.message === "wrong_email") {
        return response.status(404).json({
            success: false,
            message: "Wrong Email"
        })
    }
    if(err?.message.includes("users_email_key")) {
        return response.status(404).json({
            success: false,
            message: "Error: e-mail already in use"
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

    if(err?.message === "products_not_found") {
        return response.status(404).json({
            success: false,
            message: "Product not Found"
        })
    }
    
    if(err?.message === "delivery_method_not_found") {
        return response.status(404).json({
            success: false,
            message: "Delivery method not found"
        })
    }
    
    if(err?.message === "category_not_found") {
        return response.status(404).json({
            success: false,
            message: "Category not found"
        })
    }

    if(err?.message === "user_not_found") {
        return response.status(404).json({
            success: false,
            message: "User not found"
        })
    }

    if(err?.message === "product_category_not_found") {
        return response.status(404).json({
            success: false,
            message: "Product Category not Found"
        })
    }

    if(err?.message === "voucher_not_found") {
        return response.status(404).json({
            success: false,
            message: "Voucher not Found"
        })
    }

    if(err?.message === "email_request_not_found") {
        return response.status(404).json({
            success: false,
            message: "Forgot Request not Found"
        })
    }

    if(err?.message === "product_not_found") {
        return response.status(404).json({
            success: false,
            message: "Product not Found"
        })
    }

    if(err?.message === "add_category_failed") {
        return response.status(400).json({
            success: false,
            message: "Add category failed"
        })
    }

    if(err?.message === "no_forgot_request") {
        return response.status(400).json({
            success: false,
            message: "Reset Password Failed"
        })
    }

    if(err?.message === "product_update_failed") {
        return response.status(400).json({
            success: false,
            message: "Update Product Failed"
        })
    }

    if(err?.message === "create_voucher_failed") {
        return response.status(400).json({
            success: false,
            message: "Create Voucher failed"
        })
    }

    console.log(err)
    return response.status(500).json({
        success: false,
        message: "Error: Internal server error",
    })
}

module.exports = errorHandler
