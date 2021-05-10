import formidable from 'formidable';
import fs from 'fs';


//1.declare pathDir untuk menyimpan image di local storage
const pathDir = __dirname + '../../../uploads/';

const upload = async (req, res,next) => {

    // jika directory belum ada then create new one
    if (!fs.existsSync(pathDir)) {
        fs.mkdirSync(pathDir);
    }

    const form = formidable({ multiples: true, uploadDir: pathDir });
    form.parse(req);
    form
        .on('fileBegin', (keyName, file) => {
            console.log(keyName, file);
            file.path = pathDir + file.name;
        })
        .on('field', (keyName, value) => {
            console.log(keyName, value);
        })
        .on('file', (keyName, file) => {
            console.log(keyName, file.name);
            req.fileName = file.name;
        })
        .on('end', () => {
            console.log('-> upload to storage done');
            next();
            //res.send("File Uploaded Successfully");
        });
}

const uploadMultipart = async (req,res,next)=>{
    // jika directory belum ada then create new one
    if (!fs.existsSync(pathDir)) {
        fs.mkdirSync(pathDir);
    }

    const files = [];
    const fields = [];
    
    const dataFiles ={
        fields : fields,
        files : files
    }

    //1. gunakan spread operator
    const dataCompany=[];
    let multipart ={};
    let compSize = undefined;
    let compName = undefined;
    let compIndustry = undefined;


    const form = formidable({ multiples: true, uploadDir: pathDir });
    form.parse(req);

    form
         .on('fileBegin', (keyName, file) => {
            file.path = pathDir + file.name;
        }) 
        .on('field', (keyName, value) => {
            fields.push({ keyName, value });
            //2.gunakan spread operator untuk tambah attribute
            compSize = (keyName === 'comp_size' ? value : compSize)
            compName = (keyName === 'comp_name' ? value : compName)
            compIndustry = (keyName === 'comp_industry' ? value : compIndustry)
            multipart = { ...multipart, compSize, compName, compIndustry }
        })
        .on('file', (keyName, file) => {
            console.log(file);
            const fileName = file.name;
            files.push({ keyName, fileName, });
            //3. gunakan spread operator
            multipart = { ...multipart, fileName}
            dataCompany.push(multipart)
        })
        .on('end', () => {
            console.log('-> upload to storage done');
            //2. kirim dataFiles ke function lain di object req
            req.dataFiles = dataFiles;

            //4.gunakan spread operator
            req.dataCompany = dataCompany;

            next();
        });
}

const download = async (req, res) => {
    const filename = `${pathDir}/${req.params.filename}`
    res.download(filename);
}

export default {
    upload,
    download,
    uploadMultipart
}