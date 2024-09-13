output "static_website_url" {
  value = azurerm_storage_account.frontend_storage.primary_web_endpoint
}

output "api_gateway_url" {
  value = azurerm_container_group.container.fqdn
}

output "mysql_ip_address" {
  value = azurerm_container_group.container.ip_address
}

output "container_app_ip_address" {
  value = azurerm_container_app.ca.outbound_ip_addresses
}
