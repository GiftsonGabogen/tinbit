import { Pool } from "pg";

const conString =
  "postgres://dqfczzyj:QzqFq5WFa14QKu9AF6ob8X59YIEZShsI@floppy.db.elephantsql.com/dqfczzyj"; //Can be found in the Details page

const pool = new Pool({
  connectionString: conString,
  max: 5,
  idleTimeoutMillis: 5000,
});

export default pool;
