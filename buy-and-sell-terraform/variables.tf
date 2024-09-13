variable "resource_group_name" {
  description = "The name of the resource group in which to create the resources."
  type        = string
}

variable "location" {
  description = "The location/region where the resources will be created."
  type        = string
}

variable "azure_storage_account_name" {
  description = "The name of the storage account."
  type        = string
}

variable "subscription_id" {
  description = "The subscription ID."
  type        = string
}

variable "container_group_name" {
  description = "The name of the container group."
  type        = string
}

variable "container_name_database" {
  description = "The name of the container."
  type        = string
}

variable "image_database" {
  description = "The image of the container."
  type        = string
}

variable "mysql_root_password" {
  description = "The root password for the MySQL database."
  type        = string
}

variable "mysql_database" {
  description = "The name of the MySQL database."
  type        = string
}

variable "mysql_user" {
  description = "The user for the MySQL database."
  type        = string
}

variable "mysql_password" {
  description = "The password for the MySQL database."
  type        = string
}

variable "acr_password" {
  description = "The password for the Azure Container Registry."
  type        = string
}

variable "container_app_environment_name" {
  description = "The name of the container app environment."
  type        = string
}

variable "container_app_name" {
  description = "The name of the container app."
  type        = string
}

variable "container_backend_name" {
  description = "The name of the container app backend."
  type        = string
}

variable "image_backend" {
  description = "The image of the container app backend."
  type        = string

}





