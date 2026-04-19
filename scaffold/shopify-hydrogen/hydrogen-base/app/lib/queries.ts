/**
 * Storefront API 2024-10 queries — `storefront.query()` ile kullanilmak uzere.
 * Import fragment'lari ile compose edilmis typed sorgular.
 */

import {
  PRODUCT_FRAGMENT,
  PRODUCT_CARD_FRAGMENT,
  COLLECTION_FRAGMENT,
  MONEY_FRAGMENT,
  IMAGE_FRAGMENT,
  PRICE_RANGE_FRAGMENT,
} from "./fragments";

/* ---- Single product detay sayfasi ---- */
export const PRODUCT_QUERY = `#graphql
  query Product($handle: String!, $country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;

/* ---- Collection (kategori sayfasi) ---- */
export const COLLECTION_QUERY = `#graphql
  query Collection(
    $handle: String!,
    $first: Int = 24,
    $after: String,
    $sortKey: ProductCollectionSortKeys = MANUAL,
    $reverse: Boolean = false,
    $filters: [ProductFilter!]
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      ...Collection
      products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse, filters: $filters) {
        nodes { ...ProductCard }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
      }
    }
  }
  ${COLLECTION_FRAGMENT}
  ${PRODUCT_CARD_FRAGMENT}
` as const;

/* ---- Homepage — featured collection + new arrivals ---- */
export const HOMEPAGE_QUERY = `#graphql
  query Homepage($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    featured: collection(handle: "featured") {
      ...Collection
      products(first: 8) {
        nodes { ...ProductCard }
      }
    }
    newArrivals: products(first: 12, sortKey: CREATED_AT, reverse: true) {
      nodes { ...ProductCard }
    }
    collections(first: 6) {
      nodes { ...Collection }
    }
  }
  ${COLLECTION_FRAGMENT}
  ${PRODUCT_CARD_FRAGMENT}
` as const;

/* ---- Search ---- */
export const SEARCH_QUERY = `#graphql
  query Search(
    $query: String!,
    $first: Int = 24,
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: $first, query: $query) {
      nodes { ...ProductCard }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;

/* ---- Menu (navigation) ---- */
export const MENU_QUERY = `#graphql
  query Menu($handle: String!) {
    menu(handle: $handle) {
      id
      title
      items {
        id
        title
        url
        resourceId
        type
        items {
          id
          title
          url
        }
      }
    }
  }
` as const;

/* ---- Policies (KVKK, iade, kargo) ---- */
export const POLICIES_QUERY = `#graphql
  query Policies {
    shop {
      privacyPolicy { id handle title body }
      refundPolicy { id handle title body }
      shippingPolicy { id handle title body }
      termsOfService { id handle title body }
    }
  }
` as const;

/* ---- Predictive search (command palette icin) ---- */
export const PREDICTIVE_SEARCH_QUERY = `#graphql
  query PredictiveSearch(
    $query: String!,
    $limit: Int = 5,
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    predictiveSearch(query: $query, limit: $limit) {
      products { ...ProductCard }
      collections { ...Collection }
      queries { text styledText }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
  ${COLLECTION_FRAGMENT}
` as const;
