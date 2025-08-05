import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
export const genratejwt= (userid) => {
    try {
        const token =  jwt.sign({userid},process.env.JWT_SECRET,{
            expiresIn:"2d"
        })
        console.log(token)
       
        return token;
    } catch (error) {
        console.log("error in genrate jwt function",error.message);
        console.log("unable to genrate jwttoken ");
        
    }   
}