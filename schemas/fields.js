const { GraphQLObjectType, GraphQLID, GraphQLList } = require("graphql");
const { PrismaClient } = require("@prisma/client");
const { UserType,ProjectType } = require("./types");
const { db } = require("../pgAdaptor");
const prisma = new PrismaClient();

const projects = {
    type: new GraphQLList(ProjectType),
    resolve(parentValue, args) {
      return prisma.project.findMany({});
    }
}

const projectsById = {
    type: ProjectType,
    args: { id: { type: GraphQLID } },
    resolve(parentValue, args) {
      const query = `SELECT * FROM project WHERE id=$1`;
      const values = [args.id];

      return db
        .one(query, values)
        .then(res => res)
        .catch(err => err);
    }
}

const user = {
    type: UserType,
    args: { id: { type: GraphQLID } },
    resolve(parentValue, args) {
      const query = `SELECT * FROM users WHERE id=$1`;
      const values = [args.id];

      return db
        .one(query, values)
        .then(res => res)
        .catch(err => err);
    }
}

exports.projects = projects;
exports.projectsById = projectsById;
exports.user = user;