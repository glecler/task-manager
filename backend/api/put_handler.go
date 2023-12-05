package api

import (
	"net/http"
	"database/sql"
	"github.com/labstack/echo"
	"strconv"
	"github.com/glecler/task-manager/backend/models"
)

func PutDescriptionHandler (c echo.Context, db *sql.DB) error {
	itemID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid item ID")
	}

	var updatedItem models.Item
	if err := c.Bind(&updatedItem); err != nil {
		return c.String(http.StatusBadRequest, "Invalid request body")
	}

	_, err = db.Exec("UPDATE items SET description = ? WHERE id = ?", updatedItem.Description, itemID)
	if err != nil {
		return c.String(http.StatusInternalServerError, "Failed to update item")
	}
	return c.JSON(http.StatusOK, updatedItem)
}

func PutStatusHandler (c echo.Context, db *sql.DB) error {
	itemID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid item ID")
	}

	var updatedItem models.Item
	if err := c.Bind(&updatedItem); err != nil {
		return c.String(http.StatusBadRequest, "Invalid request body")
	}

	_, err = db.Exec("UPDATE items SET status = ? WHERE id = ?", updatedItem.Status, itemID)
	if err != nil {
		return c.String(http.StatusInternalServerError, "Failed to update item")
	}
	return c.JSON(http.StatusOK, updatedItem)
}
