#!/bin/bash

cd frontend
npm run build

cd ..
go run backend/main.go
