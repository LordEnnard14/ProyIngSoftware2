import express from "express";
import cors from "cors";
import bodyParser from "body-parser";


app.use(
    cors({ origin: "http://localhost:3000",
    })
  );
  app.use( bodyParser.urlencoded({  extended: true,})
  );