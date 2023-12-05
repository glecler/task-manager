package api

import (
	"net/http"
	"github.com/labstack/echo"
)

func getHandler(c echo.Context) {
        rows, err := db.Query("SELECT * FROM items")
        if err != nil {
            return c.String(http.StatusInternalServerError, "Failed to query items")
        }
        defer rows.Close()

        var items []Item
        for rows.Next() {
            var item Item
            if err := rows.Scan(&item.ID, &item.Status, &item.Description); err != nil {
                return c.String(http.StatusInternalServerError, "Failed to scan item")
            }
            items = append(items, item)
        }

        return c.JSON(http.StatusOK, items)
}
