import Note from "../models/Note.js"

export const getAllNotes = async (req,res) => {
   try {
    const  notes = await Note.find().sort({ createdAt : -1});
    res.status(200).json(notes);
    
    
   } catch (error) {
    console.error("error in getAllNotes controller");
    res.status(500).json({message:"internal servere error"});
    
   }
}


export const getNoteById = async (req,res) =>{
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message:"Note is not found"})
        res.status(200).json(note);
        
    } catch (error) {
        console.error("error in getNoteById controller");
        res.status(500).json({message:"internal servere error"});
    
        
    }
}

export const createNotes = async (req,res) => {
    try {
        const { title, content} = req.body;
        const newNote = new Note ({ title, content})

        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in createNote controller",error);
        res.status(201).json({message:"Internal server error "});  
    }
}

export const updateNotes = async (req,res) => {
   try {
    const { title, content} = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content},{new: true,});

    if(!updatedNote) return res.status(404).json({ message:"note not found"});

    res.status(200).json(updatedNote);
   } catch (error) {
    console.error("Error in updateNote controller",error);
    res.status(500).json({message:"Internal server error "});
    
   }
}

export const deleteNotes = async (req,res) => {
    try {
       const deletedNote = await Note.findByIdAndDelete(req.params.id);
       if(!deletedNote) return res.status(404).json({ message:"note not found"});
       res.status(200).json({message:"note is deleted succesfully"});
    } catch (error) {
        console.error("Error in deleteNotes controller",error);
        res.status(500).json({message:"Internal server error "});
    
        
    }
    
}