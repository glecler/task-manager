package main

import (
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
    // Initialize Echo
    e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"}, // Your React app's origin
		AllowMethods: []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete},
	}))
	

    // Connect to the SQLite database
    db, err := sql.Open("sqlite3", "database.db")
    if err != nil {
        e.Logger.Fatal(err)
    }
    defer db.Close()
	
	// Create the "items" table
	if err := createTable(db); err != nil {
		fmt.Println("Failed to create table:", err)
		return
	}
    
	// Define a struct to represent an item
    type Item struct {
        ID   int    `json:"id"`
        Status string `json:"status"`
        Description string `json:"description"`
    }

    // Create an endpoint to retrieve items
    e.GET("/items", func(c echo.Context) error {
        // Query the database for items
        rows, err := db.Query("SELECT * FROM items")
        if err != nil {
            return c.String(http.StatusInternalServerError, "Failed to query items")
        }
        defer rows.Close()

        // Iterate through the rows and populate items
        var items []Item
        for rows.Next() {
            var item Item
            if err := rows.Scan(&item.ID, &item.Status, &item.Description); err != nil {
                return c.String(http.StatusInternalServerError, "Failed to scan item")
            }
            items = append(items, item)
        }

        // Return items as JSON
        return c.JSON(http.StatusOK, items)
    })

	// Create an endpoint to add a new item
	e.POST("/items", func(c echo.Context) error {
		// Parse the request body into an Item struct
		var newItem Item
		if err := c.Bind(&newItem); err != nil {
			return c.String(http.StatusBadRequest, "Invalid request payload")
		}
		
		fmt.Println("Received newItem:", newItem)

		// Insert the new item into the database
		result, err := db.Exec("INSERT INTO items (Status, Description) VALUES (?, ?)", newItem.Status, newItem.Description)
		if err != nil {
			return c.String(http.StatusInternalServerError, "Failed to insert item")
		}

		// Get the ID of the inserted item
		newItemID, err := result.LastInsertId()
		if err != nil {
			return c.String(http.StatusInternalServerError, "Failed to get item ID")
		}
		newItem.ID = int(newItemID)

		// Return the newly created item as JSON
		return c.JSON(http.StatusCreated, newItem)
	})

	e.PUT("/items/:id", func(c echo.Context) error {
		itemID, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			return c.String(http.StatusBadRequest, "Invalid item ID")
		}

		var updatedItem Item
		if err := c.Bind(&updatedItem); err != nil {
			return c.String(http.StatusBadRequest, "Invalid request body")
		}

		_, err = db.Exec("UPDATE items SET description = ? WHERE id = ?", updatedItem.Description, itemID)
		if err != nil {
			return c.String(http.StatusInternalServerError, "Failed to update item")
		}
		return c.JSON(http.StatusOK, updatedItem)
	})
	
	e.PUT("/itemsstatus/:id", func(c echo.Context) error {
		itemID, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			return c.String(http.StatusBadRequest, "Invalid item ID")
		}

		var updatedItem Item
		if err := c.Bind(&updatedItem); err != nil {
			return c.String(http.StatusBadRequest, "Invalid request body")
		}

		_, err = db.Exec("UPDATE items SET status = ? WHERE id = ?", updatedItem.Status, itemID)
		if err != nil {
			return c.String(http.StatusInternalServerError, "Failed to update item")
		}
		return c.JSON(http.StatusOK, updatedItem)
	})


	e.DELETE("/items/:id", func(c echo.Context) error {
    // Parse the item ID from the URL parameter
    itemID, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        return c.String(http.StatusBadRequest, "Invalid item ID")
    }

    // Delete the item from the database
    _, err = db.Exec("DELETE FROM items WHERE id = ?", itemID)
    if err != nil {
        return c.String(http.StatusInternalServerError, "Failed to delete item")
    }

    return c.NoContent(http.StatusNoContent)
	})

    // Start the Echo server
    e.Start(":8080")
}

