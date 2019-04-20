// const assert = require("assert");
// const Database = require("./database").Database;
import * as assert from "assert";
import { Database } from "./database";

describe("database", () => {
  it("#query() with placeholders", async () => {
    const queryResult = [{ id: 101, email: "test@email.com" }];

    const mockMysql = {
      createConnection: function(config) {
        return {
          query: function(sql, placeholders, callback) {
            callback(null, queryResult);
          }
        };
      }
    };

    const db = new Database(mockMysql, {});

    const res = await db.query("SELECT id, email from users WHERE id = ?", 101);

    assert.equal(res[0].id, queryResult[0].id);
    assert.equal(res[0].email, queryResult[0].email);
  });

  it("#query() should handle with placeholders error", async () => {
    const queryResult = "Parse Error";

    const mockMysql = {
      createConnection: function(config) {
        return {
          query: function(sql, placeholders, callback) {
            callback(queryResult);
          }
        };
      }
    };

    const db = new Database(mockMysql, {});

    try {
      const res = await db.query("SELECT id, email from users WHERE id = ?", 101);
    } catch (e) {
      assert.equal(e, queryResult);
    }
  });

  it("#close() should close connection", async () => {
    const mockMysql = {
      createConnection: function(config) {
        return {
          end: function(callback) {
            callback();
          }
        };
      }
    };

    const db = new Database(mockMysql, {});

    const res = await db.close();
    assert.equal(undefined, res);
  });

  it("#close() should handle close connection errors", async () => {
    const mockMysql = {
      createConnection: function(config) {
        return {
          end: function(callback) {
            callback(Error("Boom!"));
          }
        };
      }
    };

    const db = new Database(mockMysql, {});

    try {
      const res = await db.close();
    } catch (e) {
      assert.equal("Boom!", e.message);
    }
  });
});
