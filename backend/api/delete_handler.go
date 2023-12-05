package api

import (
	"net/http"
	"github.com/labstack/echo"
)

func deleteHandler(c.echo.Context) error {
	itemID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid item ID")
	}

	_, err = db.Exec("DELETE FROM items WHERE id = ?", itemID)
	if err != nil {
		return c.String(http.StatusInternalServerError, "Failed to delete item")
	}

	return c.NoContent(http.StatusNoContent)

}
