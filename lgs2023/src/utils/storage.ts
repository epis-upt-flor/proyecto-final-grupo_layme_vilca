import fs from 'node:fs'

type ParamsMethodStore = {
    from : string
    to :string
}
export default abstract class STORAGE {

    static store({ from , to } : ParamsMethodStore){
        const file = fs.readFileSync(from);
        fs.writeFileSync(to, file);
        fs.unlinkSync(from);
    }

    static delete(fullName : string){
        try {
            fs.unlinkSync(`public/images/banner/${fullName}`)
        } catch (error) {
            console.error(error)
        }
    }
}