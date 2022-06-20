const express = require("express");
const router = express.Router();
const projectModel = require('../models/Projects');

// Add a project
router.post("/createProject", async (req, res) => {
    const project = req.body;
    const newProject = new projectModel(project);
    await newProject.save();

    res.json(project);
});

// Retrieve all projects
router.get('/getProjects', (req, res) => {
    projectModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// Update a project
router.put('/updateProject/:id', (req, res) => {
    projectModel.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,updatedProject) => {
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated succesfully"
            });
        }
    );
});

// Delete a project
router.delete('/deleteProject/:id', (req, res) => {
    projectModel.findByIdAndRemove(req.params.id).exec((err, deletedProject) => {
        if (err) {
            return res.status(400).json({
                message: "Delete unsuccessful", err
            });
        }

        return res.json({
            message: "Delete successful", deletedProject
        });
    });
});

//Retrieve a specific project
router.get("/getProject/:id", (req, res) => {
    let projectId = req.params.id;

    projectModel.findById(projectId, (err, project) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }
        return res.status(200).json({
            success: true,
            project
        });
    });
});

// Accept project
router.put('/acceptProject/:id', async (req,res)=>{
    try{
        console.log('Project accepted');
        await projectModel.findByIdAndUpdate(req.params.id,{
            isAccepted:true
        }), res.json({status: 'ok'})
    }catch(err){
        console.log(err);
        res.json({status:'error'});
    }
})

// Reject project
router.put('/rejectProject/:id', async (req,res)=>{
    try{
        console.log('Project rejected');
        await projectModel.findByIdAndUpdate(req.params.id,{
            isAccepted:false
        }), res.json({status: 'ok'})
    }catch(err){
        console.log(err);
        res.json({status:'error'});
    }
})

// Add a rating
router.put('/ratingAdded/:id', async(req,res) => {
    try{
        console.log('Rating Added');
        await projectModel.findByIdAndUpdate(req.params.id,{
            isRated:true
        }), res.json({status: 'ok'})
    }catch(err){
        console.log(err);
        res.json({status:'error'});
    }
})

module.exports = router;
