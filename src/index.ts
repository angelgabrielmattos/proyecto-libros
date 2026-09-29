import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const URI_DB = process.env.URI_DB || ""

const connectDb = async (URI: string) => {
    try {
        await mongoose.connect(URI)
    } catch (e) {
    console.log(`Error al conectar a MongoDb :(`)
    }
}

const args = process.argv.splice(2)
const action = args[0]

interface IBook {
    titulo: string
    autor: string
    precio: number
    stock: number
}

const bookSchema = new mongoose.Schema<IBook>({
    titulo: String,
    autor: String,
    precio: Number,
    stock: Number
}, {
    versionKey: false
})

const Book = mongoose.model("book", bookSchema)