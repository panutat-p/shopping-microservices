package main

import (
	"github.com/gin-gonic/gin"
)

func PingPong(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}

func ListOrders(c *gin.Context) {
	c.JSON(200, gin.H{
		"data": []string{
			"order1111",
			"order1112",
			"order1113",
			"order1114",
			"order1115",
		},
	})
}

func AddNewOrder(c *gin.Context) {
	v, ok := c.MustGet("user_id").(float64)
	if !ok {
		c.JSON(500, gin.H{
			"error": "Failed to parse user_id",
		})
		return
	}
	c.JSON(200, gin.H{
		"message": "Add new order",
		"data": map[string]any{
			"user_id":  v,
			"order_id": 10,
		},
	})
}
