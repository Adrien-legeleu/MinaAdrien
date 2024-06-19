import express from "express";
import mongoose from "mongoose";

export interface IUser {
  _id: string;
  username: string;
  profilPhoto: string;
}

const Userschema  new mongoose.Schema<IUser> (
    {
        _id : {
            type : String,
            required : true
        },
        username : {
            type : String,
            required : true
        },
        profilPhoto : {
            type : String,
            required : true
        }
    }
)