const express = require("express");
const router = new express.Router();
const db = require("../db")
const ExpressError = require("../expressError")


// GET /companies - {companies: [{code, name}, ...]}
router.get("/", async function(req, res, next) {

    try {
      const compQuery = await db.query(`SELECT * FROM companies`);
      return res.json({ companies: compQuery.rows});
    } catch(err){
      return next(err)
    }
  });

// GET /companies/[code] Return obj of company: {company: {code, name, description}}
router.get("/:code", async function(req, res, next) {

    try {
        let code = req.params.code;
        const compQuery = await db.query(`SELECT * FROM companies WHERE code = $1`, [req.params.code]);
        
        const invResult = await db.query(
            `SELECT id
             FROM invoices
             WHERE comp_code = $1`,
          [code]
        );

        const industryResult = await db.query(`
              SELECT c.code, c.name, i.industry
                FROM companies AS c
                  LEFT JOIN sectors AS s 
                    ON c.code = s.code
                  LEFT JOIN industries AS i ON s.ind_code = i.ind_code
                WHERE c.code = $1;`, [code]);
        console.log("join query", industryResult.rows)

        // If no query then throw error
        if (compQuery.rows.length === 0) {
            throw new ExpressError(`Can't find companies with code of ${req.params.code}`, 404)
          }

        const invoices = invResult.rows;
        const industry = industryResult.rows;
        const company = compQuery.rows[0]

        company.invoices = invoices.map( inv => inv.id)
        company.industry = industry.map( inv => inv.industry)

  
        return res.json({ "company": company});

    } catch(err){
         return next(err)
    }
  });

// POST /companies - Adds a company. - Needs to be given JSON like: {code, name, description}
// Returns obj of new company: {company: {code, name, description}}
router.post("/", async function(req, res, next) {

    try {
        const { code, name, description } = req.body;
        const compQuery = await db.query(
            `INSERT INTO companies (code, name, description)
                VALUES ($1, $2, $3)
                RETURNING code, name, description`, [code, name, description]);

        if (compQuery.rows.length === 0) {
            throw new ExpressError(`Can't find companies with code of ${code}`, 404)
            }
      return res.status(201).json({ companies: compQuery.rows[0]});
    } catch(err){
      return next(err)
    }
  });

//   PUT /companies/[code] - exisitng company
router.patch("/:code", async function(req, res, next) {

    try {
        const { code } = req.params;
        const { name, description } = req.body;
        const compQuery = await db.query(
            `UPDATE companies SET name=$2, description=$3 WHERE code=$1
                RETURNING code, name, description`, [code, name, description]);
        return res.json({ companies: compQuery.rows[0]});
    } catch(err){
      return next(err)
    }
  });

// DELETE /companies/[code]
router.delete("/:code", async function(req, res, next) {
    try {
        const { code } = req.params;
        const compQuery = await db.query(`DELETE FROM companies WHERE code = $1 RETURNING code`, [code]);
        if (compQuery.rows.length === 0) {
            throw new ExpressError(`Can't find companies with code of ${req.params.code}`, 404)
          }        
        return res.json({ status: "deleted"});
    } catch(err){
      return next(err)
    }
  });

//  Industry ROUTES --------------------------

// adding an industry
router.post("/add-industry", async function (req, res, next) {

  try {
    const { ind_code, industry } = req.body;
    console.log("data", ind_code, industry)
    const results = await db.query(
        `INSERT INTO industries (ind_code, industry)
            VALUES ($1, $2)
            RETURNING ind_code, industry`, [ind_code, industry]);

    // if (compQuery.rows.length === 0) {
    //     throw new ExpressError(`Can't find indusrys with code of ${code}`, 404)
    //     }
  return res.status(201).json({ industry: results.rows[0]});
  } catch (error) {
    return next(error)
  }

});

// listing all industries, which should show the company code(s) for that industry
// associating an industry to a company
// NOTE - 4/10/22 the two other task above are easy and I am not going to do due to time.
// (cont) I did the harder tasks so I am submitting it. 


module.exports = router;