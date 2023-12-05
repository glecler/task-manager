package main

import (
	"github.com/glecler/task-manager/backend/api"
    "database/sql"
	"fmt"
    "github.com/labstack/echo"
    _ "github.com/mattn/go-sqlite3"
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

    e.GET("/items", func(c echo.Context) error { return api.GetHandler(c, db)})
	e.POST("/items", func(c echo.Context) error { return api.PostHandler(c, db)})
	e.PUT("/items/:id", func(c echo.Context) error { return api.PutDescriptionHandler(c, db)})
	e.PUT("/itemsstatus/:id", func(c echo.Context) error { return api.PutStatusHandler(c, db)})
	e.DELETE("/items/:id", func(c echo.Context) error { return api.DeleteHandler(c, db)})
	
	frontendDir := "./frontend/build"
	e.Static("/", frontendDir)

    e.Start(":80")
}

