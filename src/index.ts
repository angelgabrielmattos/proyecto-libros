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

const generateError = (message: string, name: string) => {
    const error = new Error(message)
    error.name = name
    return error
}

const handleError = (error: Error) => {
    if (error.name === "CastError") {
    return "Invalid ID"
    }

    return error.message
}

const getBooks = async (id: string | undefined) => {
    try {
    if (!id) {
        return await Book.find({}, { titulo: 1, _id: 1 })
    }

    const foundBook = await Book.findById(id)

    if (!foundBook) {
        throw generateError("Book not found", "BookNotFound")
    }

    return foundBook
    } catch (error) {
    const e = error as Error
    return handleError(e)
    }
}

// create --titulo="El Principito" --autor="Antoine de Saint-Exupéry" --precio=15000 --stock=10
const createBook = async (data: string[]) => {
    try {
    const newBook: IBook = {
        titulo: "libro",
        autor: "sin autor",
        precio: 0,
        stock: 0
    }

    if (data[0]?.split("=")[0] !== "titulo" || !data[0]?.split("=")[1]) {
        console.log("Titulo is required")
        return
    }

    for (let i = 0; i < data.length; i++) {
        const prop = data[i]?.split("=") as string[]
        const nameProp = prop[0]
        const value = prop[1]

    switch (nameProp) {
        case "titulo":
            newBook.titulo = value as string
            break

        case "autor":
            newBook.autor = value ? value : newBook.autor
            break

        case "precio":
            newBook.precio = value ? Number(value) : newBook.precio
            break

        case "stock":
            newBook.stock = value ? Number(value) : newBook.stock
            break

        default:
        throw generateError(
            "Invalid data to create book",
            "InvalidData"
            )
        }
    }

    return await Book.create(newBook)
    } catch (error) {
    const e = error as Error
    return handleError(e)
    }
}

const updateBook = async (
    id: string | undefined,
    updates: string[]
) => {
    try {
    const data: Partial<IBook> = {}

    for (const update of updates) {
        const [prop, value] = update.split("=")

        if (!value) {
        throw generateError(
            `Invalid data for ${prop}`,
            "InvalidData"
            )
        }

    switch (prop) {
        case "titulo":
        data.titulo = value
        break

        case "autor":
        data.autor = value
        break

        case "precio":
        data.precio = +value
        break

        case "stock":
        data.stock = +value
        break

        default:
        throw generateError(
            "Invalid data to update book",
            "InvalidData"
            )
        }
    }

    return await Book.findByIdAndUpdate(
        id,
        data,
        { new: true }
    )
    } catch (error) {
    const e = error as Error
    return handleError(e)
    }
}

const deleteBook = async (id: string | undefined) => {
    try {
    if (!id) {
        await Book.deleteMany({})
        return "Books deleted succefully"
    }

    const deletedBook = await Book.findByIdAndDelete(id)

    if (!deletedBook) {
        throw generateError(
        "Book not found",
        "BookNotFound"
        )
    }

    return deletedBook
    } catch (error) {
    const e = error as Error
    return handleError(e)
    }
}