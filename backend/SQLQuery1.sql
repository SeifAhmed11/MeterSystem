USE [MeterSystemDB];
GO

SET ANSI_NULLS ON;
GO
SET QUOTED_IDENTIFIER ON;
GO

CREATE PROCEDURE [dbo].[customer_details] 
    @from DATE, 
    @to DATE,
    @customer_code NVARCHAR(20) = NULL,
    @meter_serial NVARCHAR(20) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        c.Name,
        con.Customer_Code,
        m.Serial,
        COUNT(CASE WHEN r.CreatedAt BETWEEN @from AND @to THEN 1 END) AS Recharge_Count,
        SUM(CASE WHEN r.CreatedAt BETWEEN @from AND @to THEN r.Amount ELSE 0 END) AS Total_Amount,
        con.IsDeleted,
        LastRecharge.Last_Recharge_Date,
        LastRecharge.Last_Recharge_Amount
    FROM Customers c
    INNER JOIN Contracts con ON c.Id = con.CustomerId
    INNER JOIN Meters m ON m.Id = con.MeterId
    LEFT JOIN Recharges r ON r.MeterId = m.Id
    OUTER APPLY (
        SELECT TOP 1
            r2.CreatedAt AS Last_Recharge_Date,
            r2.Amount AS Last_Recharge_Amount
        FROM Recharges r2
        WHERE r2.MeterId = m.Id
        ORDER BY r2.CreatedAt DESC
    ) AS LastRecharge
    WHERE con.CreatedAt BETWEEN @from AND @to
      AND (@customer_code IS NULL OR con.Customer_Code = @customer_code)
      AND (@meter_serial IS NULL OR m.Serial = @meter_serial)
    GROUP BY 
        c.Name, 
        con.Customer_Code, 
        m.Serial, 
        con.IsDeleted,
        LastRecharge.Last_Recharge_Date,
        LastRecharge.Last_Recharge_Amount;
END;
