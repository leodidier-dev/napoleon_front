
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import schema from './schema.json';
const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: schema
  })

export default ({req, app}) => {
    const token = "a50f284abf8672542833fde1d9d595d753b0d58d4d19265885e3bcc7ef222ae2afe7a5fed99e3f48f5d10c7e4d4f55ed027ff76222d000be7edea56d848b44a9e5c868d859ef7b0c44a7738e95e05d2c2e9f90abf7b29a7eaa119818dbe2ef64ea5366316e4d4f8613f0cc9caae72da7f34b99cea7b428af8efbfa21114bceb1"
    return {
        httpEndpoint: "http://localhost:1337/graphql",
        getAuth: () => `bearer ${token}`, // remove if you're using the public schema
        cache: new InMemoryCache({ fragmentMatcher }),
    }
}

