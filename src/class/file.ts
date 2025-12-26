import fs from "fs"
import readline from "readline"

class FileHelper {
    static async getFile(filename: string) {
        try {

            const fileStream = fs.createReadStream(filename)
            
            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity
            });
            
            const result: string[] = []
            for await (const line of rl) {
                result.push(line)
            }
            return result
        } catch (err) {
            console.log(err)
        }
    }
}

export default FileHelper