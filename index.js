import express from "express"
import cors from "cors"
import multer from "multer"
import {v4 as uuidv4} from "uuid"
import path from "path"

const app = express()

//multer MW

const storage = multer.diskStorage({
    destination: function(req, file , cb){
    cb(null, "./uploads")
    },
    filename: function(req, file, cb){
        cb(null,file.fieldname + "-" + uuidv4() + path.extname(file.originalname))
    }
})

//mult config

const upload = multer({
    storage: storage,
})

app.use(
    cors({
        origin: ["http://localhost:3000","http://localhost:5173"],
        credentials: true,
    })
)

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
  })



 app.use(express.json())
 app.use(express.urlencoded({extended: true})) 
 app.use("/uploads", express.static("uploads"))



app.get("/", function(req, res){
    res.json({message: "Hello Protagnist-your file is ready"})
})

app.post("/upload", upload.single('file'),function(req,res){
    const lessonId = uuidv4()
    const videoPath = req.file.path
    const outputPath = `./uploads/courses/${lessonId}`
    const hlsPath = `${outputPath}/index.m3u8`

})

app.listen(8000,function(){
    console.log("Server has begun")
})

