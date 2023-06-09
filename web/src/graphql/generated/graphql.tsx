import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Course = {
  __typename?: 'Course';
  id: Scalars['ID'];
  slug: Scalars['String'];
  title: Scalars['String'];
};

export type CreateCourseInput = {
  title: Scalars['String'];
};

export type CreateProductInput = {
  title: Scalars['String'];
};

export type CreatePurchaseInput = {
  productId: Scalars['String'];
};

export type Enrollment = {
  __typename?: 'Enrollment';
  canceledAt?: Maybe<Scalars['DateTime']>;
  course: Course;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  student: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCourse: Course;
  createProduct: Product;
  createPurchase: Purchase;
};


export type MutationCreateCourseArgs = {
  data: CreateCourseInput;
};


export type MutationCreateProductArgs = {
  data: CreateProductInput;
};


export type MutationCreatePurchaseArgs = {
  data: CreatePurchaseInput;
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  slug: Scalars['String'];
  title: Scalars['String'];
};

export type Purchase = {
  __typename?: 'Purchase';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  product: Product;
  status: PurchaseStatus;
};

/**  Available purchase statuses */
export enum PurchaseStatus {
  Approved = 'APPROVED',
  Failed = 'FAILED',
  Pending = 'PENDING'
}

export type Query = {
  __typename?: 'Query';
  course: Course;
  courses: Array<Course>;
  enrollments: Array<Enrollment>;
  me: User;
  products: Array<Product>;
  purchases: Array<Purchase>;
  students: Array<User>;
};


export type QueryCourseArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  authUserId: Scalars['ID'];
  enrollments: Array<Enrollment>;
  purchases: Array<Purchase>;
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', enrollments: Array<{ __typename?: 'Enrollment', id: string, createdAt: any, course: { __typename?: 'Course', title: string, slug: string } }> } };

export type ListAllProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListAllProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, title: string }> };


export const MeDocument = gql`
    query Me {
  me {
    enrollments {
      id
      createdAt
      course {
        title
        slug
      }
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ListAllProductsDocument = gql`
    query ListAllProducts {
  products {
    id
    title
  }
}
    `;

/**
 * __useListAllProductsQuery__
 *
 * To run a query within a React component, call `useListAllProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListAllProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListAllProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListAllProductsQuery(baseOptions?: Apollo.QueryHookOptions<ListAllProductsQuery, ListAllProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListAllProductsQuery, ListAllProductsQueryVariables>(ListAllProductsDocument, options);
      }
export function useListAllProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListAllProductsQuery, ListAllProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListAllProductsQuery, ListAllProductsQueryVariables>(ListAllProductsDocument, options);
        }
export type ListAllProductsQueryHookResult = ReturnType<typeof useListAllProductsQuery>;
export type ListAllProductsLazyQueryHookResult = ReturnType<typeof useListAllProductsLazyQuery>;
export type ListAllProductsQueryResult = Apollo.QueryResult<ListAllProductsQuery, ListAllProductsQueryVariables>;