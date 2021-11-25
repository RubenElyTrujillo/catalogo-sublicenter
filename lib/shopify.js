const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

async function ShopifyData(query){
    const URL = `https://${domain}.myshopify.com/api/2021-10/graphql.json`

    const options = {
        endpoint: URL,
        method: "POST",
        headers: {
            "X-Shopify-Storefront-Access-Token": '59d20e9433562050dca011b477998986',
            "Accept": "application/json",
            "Content-Type": "application/json",

        },
        body: JSON.stringify({ query })
    }
    try {
        const data = await fetch(URL, options).then(response => {
            return response.json()
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function getAllProducts() {
    const query = 
    `{
      products(first: 250) {
        edges {
          node {
            handle
            id
          }
        }
      }
    }`
  
    const response = await ShopifyData(query)
  
    const slugs = response.data.products.edges ? response.data.products.edges : []
  
    return slugs
  }

  export async function recursiveCatalog(cursor = '', initialRequest = true) {
    let data;
  
    if (cursor !== '') {
      const query = `
        {
            products(after: "${cursor}", first: 250, query: "available_for_sale:true") {
                edges {
                    cursor
                    node {
                        id
                        title
                        options{
                            name
                            values
                        }
                        availableForSale
                    }  
                }
                pageInfo {
                    hasNextPage
                }
            }
        }
      `;
  
      const response = await ShopifyData(query);
      data = response.data.products.edges ? response.data.products.edges : [];
  
      if (response.data.products.pageInfo.hasNextPage) {
        const num = response.data.products.edges.length;
        const cursor = response.data.products.edges[num - 1].cursor;
        console.log('Cursor: ', cursor);
  
        return data.concat(await recursiveCatalog(cursor));
      } else {
        return data;
      }
    } else {    
      const query = `
        {
            products(first: 250, query: "available_for_sale:true") {
                edges {
                    cursor
                    node {
                        id
                        title
                        options{
                            name
                            values
                        }
                        availableForSale
                    }  
                }
                pageInfo {
                    hasNextPage
                }
            }
        }
      `;
  
      const response = await ShopifyData(query);
      data = response.data.products.edges ? response.data.products.edges : [];
  
      if (response.data.products.pageInfo.hasNextPage) {
        const num = response.data.products.edges.length;
        const cursor = response.data.products.edges[num - 1].cursor;
  
        return data.concat(await recursiveCatalog(cursor));
      } else {
        return data
      }
    }
  }