import jwt from 'jsonwebtoken'

function authMiddleWare(req,res,next){
     const token=req.headers['authorization']
     if(!token){
        return res.status(401).json({message:"Token not provided"});
     }
     jwt.verify(token,process.env.JWT_Secret,(err,decoded)=>{
            if(err){
                return res.status(404).json({message:"Invalid token"});
            }
            req.userId=decoded.id;
            next()
        })
}

export default authMiddleWare