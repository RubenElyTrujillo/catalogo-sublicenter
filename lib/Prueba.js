import Client from "shopify-buy";

export const client = Client.buildClient({
    storefrontAccessToken:  process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN,
    domain: process.env.SHOPIFY_STORE_DOMAIN 
})