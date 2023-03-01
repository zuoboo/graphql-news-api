const { ApolloServer, gql, delegateToSchema } = require("apollo-server");

// HackerNewsの１つ１つの投稿
let links = [
  {
    id: "link-0",
    description: "GraphQLチュートリアル学習中",
    url: "www.graphql-tutorial.com",
  },
];

// Graphqlスキーマの定義
const typeDefs = gql`
  type Query {
    info: String!
    feed: [Link]!
  }

  type Mutation {
    post(url: String!, description: String!): Link!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`;

//リゾルバ関数
const resolvers = {
  Query: {
    info: () => "HackerNewsクローン",
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      let idCount = links.length;

      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(({ url }) => console.log(`${url}でサーバーを起動中・・・`));
