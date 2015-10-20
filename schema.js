// schema.js
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFloat
} from './node_modules/graphql/type';


//curl -XPOST -H 'Content-Type:application/graphql'  -d 'query Get { user(name: "david") { name, caught, created } }' http://localhost:3000/graphql

let PersonType = new GraphQLObjectType({
  name: 'Person',
  description: '',
  fields: () => {
    lastName: {
      type: GraphQLString,
    },
    firstName: {
      type: GraphQLString,
    }
  }
});

let MetadataType = new GraphQLObjectType({
  name: 'Metadata',
  description: '',
  fields: () => {
    authors: {
      type: new GraphQLList(PersonType)
    },
    name: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    createTime: {
      type: GraphQLString
    }
  }
});

let HistoryType = new GraphQLObjectType({
  name: 'History',
  description: '',
  fields: () => {
    timePoints: {
      type: new GraphQLList(GraphQLString),
      description: 'the time of each item in the history'
    },
    ids: {
      type: new GraphQLList(GraphQLString),
      description: 'the ids of items at each time point'
    }
  }
});

let BlockType = new GraphQLObjectType({
  name: 'Block',
  description: 'A subsequence of a DNA construct or the entire construct itself',
  fields: () => {
    id: {
      type: GraphQLString,
      description: 'universally unique id',
    },
    meta: {
      type: MetadataType,
      description: 'More information about this block',
    },
    history: {
      type: HistoryType,
      description: 'The history of this block',
    },
    blocks: {
      type: new GraphQLList(BlockType),
      description: 'list of other blocks inside this block',
    }
  }
});

let ProjectType = new GraphQLObjectType({
  name: 'Project',
  description: '',
  fields: () => {
    id: {
      type: GraphQLString,
      description: 'universally unique id',
    },
    meta: {
      type: MetadataType,
      description: 'More information about this project',
    },
    history: {
      type: HistoryType,
      description: 'The history of this project',
    },
    constructs: {
      type: new GraphQLList(BlockType),
      description: 'list of other blocks inside this project',
    }
  }
});

let RootQueryType = new GraphQLObjectType({
  name: 'GET',
  fields: {
    user: {
      type: UserType,
      args: {
        name: {
          description: 'The name of the user',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, {id,name}) => {
        console.log(id + " " + name);
        return 10;
      }
    }
  }
});

let RootMutationType = new GraphQLObjectType({
  name: 'UPDATE',
  fields: {
    user: {
      type: GraphQLInt,
      description: 'Updates the count',
      resolve: function() {
        console.log("Resolve");
        return 1;
      }
    }
  }
});

let schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

export default schema;