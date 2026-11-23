const {Pool}=require("pg");
if(!process.env.DATABASE_URL) console.warn("DATABASE_URL is missing. Configure .env before starting.");
const pool=new Pool({connectionString:process.env.DATABASE_URL,ssl:process.env.NODE_ENV==="production"?{rejectUnauthorized:false}:false,max:10,idleTimeoutMillis:30000,connectionTimeoutMillis:10000});
pool.on("error",e=>console.error("PostgreSQL pool error:",e.message));
module.exports=pool;
