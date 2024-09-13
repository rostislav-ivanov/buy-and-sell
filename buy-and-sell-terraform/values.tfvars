resource_group_name        = "BuyAndSellRG2"
location                   = "Germany West Central"
azure_storage_account_name = "mybuyandselltetrik"
subscription_id            = "cd52af52-8067-442b-be12-e9c6920d4187"
container_group_name       = "BuyAndSellCG"


container_name_database = "buy-and-sell-mysql"
image_database          = "rostis.azurecr.io/buy-and-sell-mysql:latest"
mysql_root_password     = "Password1"
mysql_database          = "buy-and-sell"
mysql_user              = "hapi-server"
mysql_password          = "Password1"
acr_password            = "Cp3rd/aL/L29sNIMJoiu4TJMfwBycUHzyk4462XNj7+ACRByLgZu"

container_app_environment_name = "my-enviroment"
container_app_name             = "backend-app-5"
container_backend_name         = "backend"
image_backend                  = "rostis.azurecr.io/buy-and-sell-backend:latest"
