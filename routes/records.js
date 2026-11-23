const router=require("express").Router(), pool=require("../db");
const statuses=["Pending","In progress","Completed"];
function idValue(v){if(!/^[1-9]\d*$/.test(String(v)))return null;const n=Number(v);return Number.isSafeInteger(n)?n:null;}
function validate(body){
 if(!body||typeof body!=="object"||Array.isArray(body))return {error:"Request body must be a JSON object."};
 for(const f of ["title","category","description","status"])if(typeof body[f]!=="string")return {error:`${f} must be provided as text.`};
 const r={title:body.title.trim(),category:body.category.trim(),description:body.description.trim(),status:body.status.trim()};
 if(r.title.length<3||r.title.length>80)return {error:"Title must have 3 to 80 characters."};
 if(r.category.length<2||r.category.length>40)return {error:"Category must have 2 to 40 characters."};
 if(r.description.length<5||r.description.length>300)return {error:"Description must have 5 to 300 characters."};
 if(!statuses.includes(r.status))return {error:"Status must be Pending, In progress, or Completed."};
 return {record:r};
}
router.get("/",async(req,res,next)=>{try{const q=await pool.query("SELECT id,title,category,description,status FROM records ORDER BY id");res.status(200).json(q.rows);}catch(e){next(e);}});
router.get("/:id",async(req,res,next)=>{const id=idValue(req.params.id);if(id===null)return res.status(400).json({message:"ID must be a positive whole number."});try{const q=await pool.query("SELECT id,title,category,description,status FROM records WHERE id=$1",[id]);if(!q.rowCount)return res.status(404).json({message:"Record not found."});res.json(q.rows[0]);}catch(e){next(e);}});
router.post("/",async(req,res,next)=>{const v=validate(req.body);if(v.error)return res.status(400).json({message:v.error});const {title,category,description,status}=v.record;try{const q=await pool.query("INSERT INTO records(title,category,description,status) VALUES($1,$2,$3,$4) RETURNING id,title,category,description,status",[title,category,description,status]);res.status(201).json(q.rows[0]);}catch(e){next(e);}});
router.put("/:id",async(req,res,next)=>{const id=idValue(req.params.id);if(id===null)return res.status(400).json({message:"ID must be a positive whole number."});const v=validate(req.body);if(v.error)return res.status(400).json({message:v.error});const {title,category,description,status}=v.record;try{const q=await pool.query("UPDATE records SET title=$1,category=$2,description=$3,status=$4 WHERE id=$5 RETURNING id,title,category,description,status",[title,category,description,status,id]);if(!q.rowCount)return res.status(404).json({message:"Record not found."});res.json(q.rows[0]);}catch(e){next(e);}});
router.delete("/:id",async(req,res,next)=>{const id=idValue(req.params.id);if(id===null)return res.status(400).json({message:"ID must be a positive whole number."});try{const q=await pool.query("DELETE FROM records WHERE id=$1 RETURNING id",[id]);if(!q.rowCount)return res.status(404).json({message:"Record not found."});res.json({message:"Record deleted."});}catch(e){next(e);}});
module.exports=router;
