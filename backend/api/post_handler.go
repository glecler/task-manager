package api

import (
	"net/http"
	"github.com/labstack/echo"
)

func postHandler (c echo.Context) {
	var newItem Item
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
