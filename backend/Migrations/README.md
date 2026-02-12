To run migrations, do the following.  
  
1. Create a new DbContext  
2. Run the following in Package Manager Console (PMC)

```
Add-Migration <MigrationName> -Context <DbContextName>
Update-Database -Context <DbContextName>
```