package main

import (
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func IsLogIn(c *gin.Context) {
	if c.GetHeader("Authorization") == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		defer c.AbortWithStatus(http.StatusUnauthorized)
	}

	tokenHeader := c.GetHeader("Authorization")
	accessToken := strings.SplitAfter(tokenHeader, "Bearer")[1]
	jwtSecretKey := os.Getenv("JWT_SECRET")

	token, _ := jwt.Parse(strings.Trim(accessToken, " "), func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtSecretKey), nil
	})

	if !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		defer c.AbortWithStatus(http.StatusUnauthorized)
	} else {
		claims := token.Claims.(jwt.MapClaims)
		c.Set("user_id", claims["user_id"])
		c.Next()
	}
}
