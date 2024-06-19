import express from "express";

export interface IUser {
  _id: string;
  username: string;
  pasword: string;
  profilPhoto: string;
}
