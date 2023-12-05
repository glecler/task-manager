package models

type Item struct {
	ID   int    `json:"id"`
	Status string `json:"status"`
	Description string `json:"description"`
}

