import express from 'express'

export const jsonParser = express.json()
export const urlencoder = express.urlencoded({ extended: true })
