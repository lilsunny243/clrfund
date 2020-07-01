
const resolvers = {
  Mutation: {
    updateHello: (root, { value }, { cache }) => {
      const data = {
        hello: value
      };
      cache.writeData({ data });
      return null;
    },
    
  },
  
};

const clientState = {
  // Set initial local state.
  defaults: {
    hello: "Hello World!",
    featured: [],
    projects: [],
  },
  resolvers
};

export default function(context) {
  return {
    httpEndpoint:
      "https://api.thegraph.com/subgraphs/name/graphprotocol/everest",
    // return the client state
    clientState
  };
}
