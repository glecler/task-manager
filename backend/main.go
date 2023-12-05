package main

import (
	"./api"
    "database/sql"
    "net/http"
	"fmt"
	"strconv"
    "github.com/labstack/echo"
    _ "github.com/mattn/go-sqlite3"
	 "github.com/labstack/echo/middleware"
)

func createTable(db *sql.DB) error {
	// Create "items" table if not exists
	_, err := db.Exec(`
		CREATE TABLE IF NOT EXISTS items (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			status TEXT,
			description TEXT
		)
	`)
	return err
}


func main() {
    e := echo.New()

    db, err := sql.Open("sqlite3", "database.db")
    if err != nil {
        e.Logger.Fatal(err)
    }
    defer db.Close()
	
	if err := createTable(db); err != nil {
		fmt.Println("Failed to create table:", err)
		return
	}
    
    type Item struct {
        ID   int    `json:"id"`
        Status string `json:"status"`
        Description string `json:"description"`
    }

    e.GET("/items", api.getHandler)
	e.POST("/items", api.postHandler)
	e.PUT("/items/:id", api.putDescriptionHandler)
	e.PUT("/itemsstatus/:id", api.putStatusHandler)
	e.DELETE("/items/:id", api.deleteHandler)
	
	frontendDir := "../frontend/build"
	e.Static("/", frontendDir)

    e.Start(":8080")
}

