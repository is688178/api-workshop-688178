const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({origin: true}));

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// create cone
app.post("/api/create_cone", (req, res) => {
  (async () => {
    try {
      await db.collection("cones")
          .doc("/" + req.body.id + "/")
          .create(req.body.cone);
      return res.status(200)
          .send({"status": "cone successfully created"});
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});


// read all cones
app.get("/api/read_cones", (req, res) => {
  (async () => {
    try {
      const query = db.collection("cones");
      const response = [];
      await query.get().then((querySnapshot) => {
        const docs = querySnapshot.docs;
        for (const doc of docs) {
          const selectedItem = {
            id: doc.id,
            cone: doc.data(),
          };
          response.push(selectedItem);
        }
        return response;
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});


// read cone
// {{API}}/api/read_cone/AX-002-2021
app.get("/api/read_cone/:cone_id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("cones")
          .doc(req.params.cone_id);
      const item = await document.get();
      const response = item.data();
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});


// update cone
// {{API}}/api/update_cone/AX-002-2021
app.put("/api/update_cone/:cone_id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("cones")
          .doc(req.params.cone_id);
      await document.update(req.body.cone);
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});


// delete cone
app.delete("/api/delete_cone/:cone_id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("cones")
          .doc(req.params.cone_id);
      await document.delete();
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});


// create spare_part
app.post("/api/create_spare_part", (req, res) => {
  (async () => {
    try {
      await db.collection("spare_parts")
          .doc("/" + req.body.id + "/")
          .create(req.body.spare_part);
      return res.status(200)
          .send({"status": "sp successfully created"});
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});


// read all spare_parts
app.get("/api/read_spare_parts", (req, res) => {
  (async () => {
    try {
      const query = db.collection("spare_parts");
      const response = [];
      await query.get().then((querySnapshot) => {
        const docs = querySnapshot.docs;
        for (const doc of docs) {
          const selectedItem = {
            id: doc.id,
            spare_part: doc.data(),
          };
          response.push(selectedItem);
        }
        return response;
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});


// read spare_part
app.get("/api/read_sp/:spare_part_id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("spare_parts")
          .doc(req.params.spare_part_id);
      const item = await document.get();
      const response = item.data();
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});


// update spare_part
app.put("/api/update_sp/:spare_part_id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("spare_parts")
          .doc(req.params.spare_part_id);
      await document.update(req.body.spare_part);
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});


// delete spare_part
app.delete("/api/delete_sp/:spare_part_id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("spare_parts")
          .doc(req.params.spare_part_id);
      await document.delete();
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

exports.app = functions.region("us-central1").https.onRequest(app);
