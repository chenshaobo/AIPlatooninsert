package main

import (
	//"net/http"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	e := echo.New()
	e.Use(middleware.Logger())
	e.Static("/", "assets")
	e.Logger.Fatal(e.Start(":8080"))
}
