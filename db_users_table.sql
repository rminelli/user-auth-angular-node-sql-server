USE master
GO
CREATE DATABASE MyLabDatabase;
GO


USE MyLabDatabase
GO
CREATE TABLE Users
(
    UserID bigint IDENTITY(1,1) NOT NULL,
    UserName nvarchar(50) NOT NULL,
	UserPassword nvarchar(50) NOT NULL
	CONSTRAINT UserID PRIMARY KEY CLUSTERED 
)
	