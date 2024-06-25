import express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
      group?: Record<string, any>;
    }
  }
}
