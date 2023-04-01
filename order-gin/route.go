package main

import "github.com/gin-gonic/gin"

func InitRoutes(rg *gin.RouterGroup) {
	r := rg.Group("/")

	r.GET("/orders", ListOrders)
}
