package api

import (
	"net/http"
	"github.com/labstack/echo"
	"database/sql"
	"github.com/glecler/task-manager/backend/models"
)

func PostHandler (c echo.Context, db *sql.DB) error {
	var newItem models.Item
	if err := c.Bind(&newItem); err != nil {
		return c.String(http.StatusBadRequest, "Invalid request payload")
	}

	result, err := db.Exec("INSERT INTO items (Status, Description) VALUES (?, ?)", newItem.Status, newItem.Description)
	if err != nil {
		return c.String(http.StatusInternalServerError, "Failed to insert item")
	}

	newItemID, err := result.LastInsertId()
	if err != nil {
		return c.String(http.StatusInternalServerError, "Failed to get item ID")
	}
	newItem.ID = int(newItemID)
	
	return c.JSON(http.StatusCreated, newItem)
}
