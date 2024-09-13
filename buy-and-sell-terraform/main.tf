terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.1.0"
    }
  }
}

provider "azurerm" {
  subscription_id = var.subscription_id
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_storage_account" "frontend_storage" {
  name                     = var.azure_storage_account_name
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  static_website {
    index_document     = "index.html"
    error_404_document = "index.html"
  }
}

resource "azurerm_container_group" "container" {
  name                = var.container_group_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  ip_address_type     = "Public"
  dns_name_label      = "mybuyandselltetrik"
  os_type             = "Linux"
  restart_policy      = "Always"

  container {
    name   = var.container_name_database
    image  = var.image_database
    cpu    = "1"
    memory = "1.5"

    secure_environment_variables = {
      MYSQL_ROOT_PASSWORD = var.mysql_root_password
      MYSQL_DATABASE      = var.mysql_database
      MYSQL_USER          = var.mysql_user
      MYSQL_PASSWORD      = var.mysql_password
    }

    ports {
      port = 3306
    }
  }

  image_registry_credential {
    server   = "rostis.azurecr.io"
    username = "rostis"
    password = var.acr_password
  }
}

resource "azurerm_container_app_environment" "env" {
  name                = var.container_app_environment_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
}

resource "azurerm_container_app" "ca" {
  name                         = var.container_app_name
  container_app_environment_id = azurerm_container_app_environment.env.id
  resource_group_name          = azurerm_resource_group.rg.name
  revision_mode                = "Single"

  ingress {
    external_enabled = true
    target_port      = 8000
    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }

  identity {
    type         = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.container_app_identity.id]
  }

  template {
    container {
      name   = var.container_backend_name
      image  = var.image_backend
      cpu    = 1
      memory = "2.0Gi"
      env {
        name  = "DB_USER"
        value = var.mysql_user
      }
      env {
        name  = "DB_PASS"
        value = var.mysql_password
      }
      env {
        name  = "DB_NAME"
        value = var.mysql_database
      }
      env {
        name  = "DB_HOST"
        value = azurerm_container_group.container.fqdn
      }
      env {
        name  = "PORT"
        value = "8000"
      }
    }
  }

  registry {
    server   = azurerm_container_registry.acr.login_server
    identity = azurerm_user_assigned_identity.container_app_identity.id
  }
}

resource "azurerm_user_assigned_identity" "container_app_identity" {
  name                = "container-app-identity"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
}

resource "azurerm_role_assignment" "acr_pull" {
  principal_id         = azurerm_user_assigned_identity.container_app_identity.principal_id
  role_definition_name = "AcrPull"
  scope                = azurerm_container_registry.acr.id
}

resource "azurerm_container_registry" "acr" {
  name                = "rostis"
  resource_group_name = "ContainerRegistryRG"
  location            = "Germany West Central"
  sku                 = "Basic"
}


# terraform init
# terraform import -var-file="values.tfvars" azurerm_container_registry.acr /subscriptions/cd52af52-8067-442b-be12-e9c6920d4187/resourceGroups/ContainerRegistryRG/providers/Microsoft.ContainerRegistry/registries/rostis
# terraform fmt
# terraform validate
# terraform plan -var-file="values.tfvars"
# terraform apply -var-file="values.tfvars" -auto-approve
# terraform destroy -var-file="values.tfvars" -auto-approve
# az storage blob upload-batch -d $web -s ../buy-and-sell-frontend/dist/buy-and-sell/browser --account-name mybuyandselltetrik
# az storage blob upload-batch -d $web -s ../buy-and-sell-frontend/dist/buy-and-sell/browser --account-name mybuyandselltetrik --overwrite
# https://mybuyandselltetrik.z1.web.core.windows.net
