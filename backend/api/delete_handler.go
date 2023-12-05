package api

import (
	"net/http"
	"strconv"
	"github.com/labstack/echo"
	"database/sql"
)

func DeleteHandler(c echo.Context, db *sql.DB) error {
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
