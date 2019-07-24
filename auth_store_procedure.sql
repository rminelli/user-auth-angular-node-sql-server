USE MyLabDatabase
GO
-- =============================================
-- Author:		<Roberto Minelli>
-- Create date: <11/06/2019>
-- Description:	<Procedure that returns the user's password>
-- =============================================

CREATE PROCEDURE [dbo].[UserAuthentication]
    @userName VARCHAR(100)
AS
SET NOCOUNT ON
BEGIN
    DECLARE @_userName VARCHAR(100)
    SELECT
        UserPassword AS 'RETURN'
    FROM
        Users
    WHERE 
        UserName = @userName
END
GO


