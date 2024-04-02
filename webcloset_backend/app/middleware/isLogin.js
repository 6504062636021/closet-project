const jwt = require('jsonwebtoken');

const isLogin = () => async(req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
     return res.status(400).json({
        result: false,
        status: "error",
        msg: 'เกิดข้อผิดพลาด',
    })
    }
    const authBearer = authHeader.split(" ");
    const authToken = authBearer[1];
    if (authBearer[0] !== "Bearer" && authToken == null) 
        return res.status(400).json({
            result: false,
            status: "error",
            msg: 'เกิดข้อผิดพลาด',
        })
        jwt.verify(authToken, process.env.JWT_SECRET, async function(err, decoded) {
           if(err != null || decoded.exp > new Date().getTime()) {
                return res.status(400).json({
                    result: false,
                    status: "warning",
                    msg: 'กรุณาทำการเข้าสู่ระบบใหม่',
                })
           }
           req.user = decoded;
           next();
          });
    
}
module.exports = isLogin