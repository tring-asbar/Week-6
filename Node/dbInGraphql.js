
import db from './db.js'
import { ApolloServer,gql } from 'apollo-server';
const typeDefs = gql`
    type user{
        userid:Int!,
        username:String!
    },
    type Query{
        getAllUsers:[user],
        getUserById(userid:Int!):user
    }
    type Mutation{
        addUser(username:String!):user
        # updateUser(userid:Id!,username:String!):user
        deleteUser(userid:Int!):user
    }
`;
const resolvers = {
    Query:{
        getAllUsers:async()=>{
            const allUsers = await db.query("select * from users");
            return allUsers.rows;
        },
        getUserById:async(_,args)=>{
            const user = await db.query(`select * from users where userid = ${args.userid}`)
            return user.rows[0]
        }
    },
    Mutation:{
        addUser: async (_, args) => {
            const newUser = await db.query(
                `INSERT INTO users(username) VALUES($1) RETURNING *`, 
                [args.username]
            );
            return newUser.rows[0]; 
        },
        
        deleteUser:async(_,args)=>{
            const deletedUser = await db.query(`delete from users where userid = ${args.userid}`);
            return deletedUser.rows;
        }
    }
};

const app = new ApolloServer({ typeDefs, resolvers });
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    
});