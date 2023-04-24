import formidable from "formidable";
import { NextApiRequest } from "next";


export default abstract class FormidableRequest{

    static async parse( req : NextApiRequest) : Promise<void> {
        const form = new formidable.IncomingForm({multiples : false});
        return new Promise((resolve , reject) => {
            form.parse(req, function (err, fields, files) {
                if(err) reject()
                req.body = {...fields , ...files  }
                return resolve()
            })
        })
    }
}