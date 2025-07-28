import 'dotenv/config';
import cloudant from './cloudantclient';
import express from 'express';  
const app = express();
const PORT = 3000;

app.use(express.json());



app.post('/employees',async (req,res)=>{
    const body = req.body;
    const dbName = req.headers['dbname'] as string
    
    if(!body){
        res.status(400).json({
            error: "no inputs!."
        })
        return
    }

    await cloudant.postDocument({
        db: dbName,
        document: {
            _id: body.employee_id,
            name: body.name,
            position: body.position,
            department: body.department,
            email: body.email
        }
    })

    res.status(200).json({
        message: "successfully created!"
    })
})


app.get('/employees', async (req, res) => {

    const dbName = req.headers['dbname'] as string
    const result = await cloudant.postAllDocs({
        db: dbName,
        includeDocs: true,
    });
    const employees = result.result.rows.map(row => row.doc);

    res.status(200).json({
        message: employees
    })
})

app.get('/employees/:id', async (req, res) => {
    const userId = req.params.id;
    const dbName = req.headers['dbname'] as string
    const employee = await cloudant.getDocument({
        db: dbName,
        docId: userId,
    });
    if(!employee){
        res.status(404).json({
            error: "user not found"
        })
        return
    }

    res.status(200).json({
        message: employee.result
    })
})

app.put('/employees/update', async (req, res) => {
    const body = JSON.parse(req.body);
    const dbName = body.dbname
    const docId = body._id

    const existing = await cloudant.getDocument({ db: dbName, docId });

    try {
        await cloudant.putDocument({
            db: dbName,
            docId,
            document: {
                ...existing.result,
                name: body.name,
                department: body.department,
                position: body.position,
                email: body.email
            }
        });
        res.status(200).json({
            messsage: 'updated succcessfully'
        })

    } catch (error) {
        res.status(500).json({
            error: 'Error in updating data'
        })
        console.log(error);
    }
})


app.delete('/employees/remove', async (req, res) => {

    const body = JSON.parse(req.body);

    const dbName = body.dbName
    const docId = body._id


    const existing = await cloudant.getDocument({ db: dbName, docId });

    await cloudant.deleteDocument({
        db: dbName,
        docId,
        rev: existing.result._rev,
    });

})

app.listen(PORT,()=>{
    console.log(`app running on port ${PORT}`)
})

