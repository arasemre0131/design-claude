/**
 * GraphQL fragments — Storefront API 2024-10 uyumlu reusable yapi taslari.
 * Her query bu fragment'lari include ederek DRY ve typed bir sorgu olusturur.
 */

export const IMAGE_FRAGMENT = `#graphql
  fragment Image on Image {
    id
    url
    altText
    width
    height
  }
` as const;

export const MONEY_FRAGMENT = `#graphql
  fragment Money on MoneyV2 {
    amount
    currencyCode
  }
` as const;

export const PRICE_RANGE_FRAGMENT = `#graphql
  fragment PriceRange on ProductPriceRange {
    minVariantPrice { ...Money }
    maxVariantPrice { ...Money }
  }
  ${MONEY_FRAGMENT}
` as const;

export const SELECTED_OPTION_FRAGMENT = `#graphql
  fragment SelectedOption on SelectedOption {
    name
    value
  }
` as const;

export const VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    id
    availableForSale
    quantityAvailable
    sku
    title
    image { ...Image }
    price { ...Money }
    compareAtPrice { ...Money }
    selectedOptions { ...SelectedOption }
    unitPrice { ...Money }
    product {
      title
      handle
    }
  }
  ${IMAGE_FRAGMENT}
  ${MONEY_FRAGMENT}
  ${SELECTED_OPTION_FRAGMENT}
` as const;

export const PRODUCT_CARD_FRAGMENT = `#graphql
  fragment ProductCard on Product {
    id
    title
    handle
    vendor
    availableForSale
    featuredImage { ...Image }
    priceRange { ...PriceRange }
    compareAtPriceRange { ...PriceRange }
    metafield3d: metafield(namespace: "custom", key: "3d_model_url") {
      value
      type
    }
    metafieldSpec: metafield(namespace: "custom", key: "spec_sheet") {
      value
      type
    }
  }
  ${IMAGE_FRAGMENT}
  ${PRICE_RANGE_FRAGMENT}
` as const;

export const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    handle
    description
    descriptionHtml
    vendor
    productType
    tags
    availableForSale
    featuredImage { ...Image }
    images(first: 20) {
      nodes { ...Image }
    }
    options {
      id
      name
      values
    }
    variants(first: 250) {
      nodes { ...ProductVariant }
    }
    priceRange { ...PriceRange }
    compareAtPriceRange { ...PriceRange }
    seo {
      title
      description
    }
    metafield3d: metafield(namespace: "custom", key: "3d_model_url") {
      value
      type
    }
    metafieldArUsdz: metafield(namespace: "custom", key: "ar_usdz_url") {
      value
      type
    }
    metafieldCertificate: metafield(namespace: "custom", key: "certificate_pdf") {
      value
      type
    }
    metafieldSpec: metafield(namespace: "custom", key: "spec_sheet") {
      value
      type
    }
  }
  ${IMAGE_FRAGMENT}
  ${VARIANT_FRAGMENT}
  ${PRICE_RANGE_FRAGMENT}
` as const;

export const COLLECTION_FRAGMENT = `#graphql
  fragment Collection on Collection {
    id
    title
    handle
    description
    image { ...Image }
    seo {
      title
      description
    }
  }
  ${IMAGE_FRAGMENT}
` as const;

/* ---- Cart fragments (Hydrogen built-in cart handler ile uyumlu) ---- */

export const CART_QUERY_FRAGMENT = `#graphql
  fragment CartApiQuery on Cart {
    id
    checkoutUrl
    totalQuantity
    buyerIdentity {
      countryCode
      customer { id email firstName lastName }
      email
      phone
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        attributes { key value }
        cost {
          totalAmount { ...Money }
          amountPerQuantity { ...Money }
          compareAtAmountPerQuantity { ...Money }
        }
        merchandise {
          ... on ProductVariant { ...ProductVariant }
        }
      }
    }
    cost {
      subtotalAmount { ...Money }
      totalAmount { ...Money }
      totalTaxAmount { ...Money }
      totalDutyAmount { ...Money }
    }
    note
    attributes { key value }
    discountCodes { applicable code }
  }
  ${MONEY_FRAGMENT}
  ${VARIANT_FRAGMENT}
` as const;
