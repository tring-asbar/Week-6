const{ApolloServer,gql} = require('apollo-server');

const typeDefs = gql`
    type Users{
        id:ID!
        name:String!
        age:Int!
    }
    type Query{
        getAllUsers:[Users]
        getUser(id:ID!):Users
    }
    type Mutation{
        addNewUser(name:String!,age:Int!):Users
        editUser(id:Int!,name:String!,age:Int!):Users
        deleteUser(id:Int!):Users
    }
`;




let counter=0;
const allUsers = [
    {
        id:++counter,
        name: 'Asbar',
        age:21
    },
    {
        id:++counter,
        name: 'Usama',
        age:23
    }
]

const resolvers ={
    Query:{
        getAllUsers:()=>allUsers,
        getUser:(_,args)=>{
            const user = allUsers.find((u)=>u.id == args.id);
            if(!user){
                throw new error("Not found");
            }
            return user;
        }
    },
    Mutation:{
        addNewUser:(_,args)=>{
            const newuser = {
                id:++counter,
                name:args.name,
                age:args.age
            };
            allUsers.push(newuser);
            return newuser;
        },
        editUser:(_,args)=>{
            const user = allUsers.find((u)=>u.id == args.id);
            if(!user){
                throw new error("User not found");
            }
            if(args.name!==undefined)
                user.name = args.name;
            else if(args.age!==undefined)
                user.age = args.age;
            return user;
        },
        deleteUser:(_,args)=>{
            const index = allUsers.findIndex((u)=>u.id == args.id);
            if(index<0){
                throw new error("User not found");
            }
            const deletedUser = allUsers.splice(index,1)[0];
            return deletedUser;
        }
        
    }

}
// Server
const app = new ApolloServer({ typeDefs, resolvers });

//start
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

