package api

import (
	"database/sql"
	"net/http"
	"github.com/labstack/echo"
	"github.com/glecler/task-manager/backend/models"
)

func GetHandler(c echo.Context, db *sql.DB) error {
	rows, err := db.Query("SELECT * FROM items")
	if err != nil {
		return c.String(http.StatusInternalServerError, "Failed to query items")
	}
	defer rows.Close()

	var items []models.Item
	for rows.Next() {
		var item models.Item
		if err := rows.Scan(&item.ID, &item.Status, &item.Description); err != nil {
			return c.String(http.StatusInternalServerError, "Failed to scan item")
		}
		items = append(items, item)
	}

	return c.JSON(http.StatusOK, items)
}
