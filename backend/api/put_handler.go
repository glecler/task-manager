package api

import (
	"net/http"
	"github.com/labstack/echo"
)

func putDescriptionHandler (c echo.Context) {
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
}

func putStatusHandler (c echo.Context) {
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
}
