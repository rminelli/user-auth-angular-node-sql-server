USE master
GO
IF DB_ID ('MyLabDatabase') IS NOT NULL
DROP DATABASE MyLabDatabase;
GO
CREATE DATABASE MyLabDatabase;
GO

USE MyLabDatabase
GO
IF DB_ID ('Users') IS NOT NULL
DROP DATABASE MyLabDatabase;
GO
CREATE TABLE Users
(
    UserID bigint IDENTITY(1,1) NOT NULL,
    UserName nvarchar(50) NOT NULL,
    UserPassword nvarchar(50) NOT NULL
        CONSTRAINT UserID PRIMARY KEY CLUSTERED
)

--- Entering an example user

	INSERT INTO Users
		(UserName,UserPassword)
	VALUES 
		('roberto.minelli','roberto.minelli')