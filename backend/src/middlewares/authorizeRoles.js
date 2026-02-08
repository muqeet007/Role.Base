import ApiHandler from "../utils/ApiHandler.js";

const authorizeRoles=(...allowedRoles)=>{
    return (req,res,next)=>{
        if(!req.user || !allowedRoles.includes(req.user.role)){
            return next(new ApiHandler(403,"Forbidden. You don't have permission to access this resource."))
        }
        next()
    }
}

// the middleware will be used like this in routes:
// router.get("/admin-only", verifyToken, authorizeRoles("admin"), adminController)