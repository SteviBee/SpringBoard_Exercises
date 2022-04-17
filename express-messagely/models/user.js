/** User class for message.ly */
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ExpressError = require("../expressError");
const {ensureLoggedIn, authenticateJWT, ensureCorrectUser} = require("../middleware/auth");
const { SECRET_KEY, BCRYPT_WORK_FACTOR } = require("../config");

/** User of the site. */

class User {

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({username, password, first_name, last_name, phone}) { 
    // Set hased pwd
    const hashedPwd = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    const now = new Date()


    // insert into DB
    const result = await db.query(`
      INSERT INTO users (username, password, first_name, last_name, phone, join_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING username, password, first_name, last_name, phone`,
        [username, hashedPwd, first_name, last_name, phone, now]);

    // return user
    return result.rows[0];

    // TODO - potentially add a not correct data error here?
  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) { 
    // Get user data first
    const result = await db.query(`
      SELECT password FROM users WHERE username = $1`, [username])
    const user = result.rows[0]
    // Then, compare user-inputed password to DB password
    if (await bcrypt.compare(password, user.password) === true) {
      // TODO - need user returned or no? (4/17/22) & else or not?
      return user && true;
    } 
    else {
        // throw new ExpressError(`No such user: ${username}`, 404);
        return false;
      }
    }


  // /** Update last_login_at for user */  TODO why is this not working (4/15)
  static async updateLoginTimestamp(username) { 
    const result = await db.query(
      `UPDATE users
         SET last_login_at = current_timestamp
         WHERE username = $1
         RETURNING username`,
      [username]);
      if (!result.rows[0]) {
        throw new ExpressError(`No such user: ${username}`, 404);
      }
  }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() {
    const results = await db.query(
      `SELECT username, first_name, last_name, phone
        FROM users`
    )
    return results.rows;

   }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) { 
    const results = await db.query(
      `SELECT username, first_name, last_name, phone, join_at
        FROM users
        WHERE username = $1`, [username]
    )
    if (!results.rows[0]) {
      throw new ExpressError(`No such user: ${username}`, 404);
    }
    return results.rows[0];    
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) { 
    const results = await db.query(
      `SELECT m.id, m.to_username, u.first_name, u.last_name, u.phone,
          m.body, m.sent_at, m.read_at
        FROM messages AS m
          JOIN users as u
            ON m.to_username = u.username
        WHERE from_username = $1`, [username] 
    )
    
    // Return an array of each parameter with a custom obj "to_user"
    // Map = for each item organize it in this way
    return results.rows.map(m => ({
      id: m.id,
      to_user: {
        username: m.to_username,
        first_name: m.first_name,
        last_name: m.last_name,
        phone: m.phone
      },
      body: m.body, 
      sent_at: m.sent_at, 
      read_at: m.read_at
    }))    
  } 
  

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) { 
    const result = await db.query(
      `SELECT m.id,
              m.from_username,
              u.first_name,
              u.last_name,
              u.phone,
              m.body,
              m.sent_at,
              m.read_at
        FROM messages AS m
         JOIN users AS u ON m.from_username = u.username
        WHERE to_username = $1`,
      [username]);

  return result.rows.map(m => ({
    id: m.id,
    from_user: {
      username: m.from_username,
      first_name: m.first_name,
      last_name: m.last_name,
      phone: m.phone,
    },
    body: m.body,
    sent_at: m.sent_at,
    read_at: m.read_at
  }));    
  }
}


module.exports = User;