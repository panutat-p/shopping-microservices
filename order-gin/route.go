package main

import "github.com/gin-gonic/gin"

func InitRoutes(r *gin.Engine) {
	// root
	r.GET("ping", PingPong)

	// api/v1
	v1 := r.Group("/api/v1")
	v1.GET("/orders", ListOrders)
	v1.POST("/orders/add", IsLogIn, AddNewOrder)
}
