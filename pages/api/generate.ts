import { makeSchema, queryType, mutationType, objectType } from '@nexus/schema';
import { nexusPrisma } from 'nexus-plugin-prisma';
import { dmmf } from '@prisma/client';

interface Obj {
  [method: string]: () => void
}

const allTheThings = (obj: Obj) => {
  for (const method in obj) {
    if (typeof obj[method] === 'function') {
      obj[method]()
    }
  }
}

// extract all models from prisma dmmf
const parentTypes = () => {
  const models = dmmf.mappings.map((e) => e.model)
  return models.map((name) =>
    objectType({
      name,
      definition(t) {
        allTheThings(t.model)
      },
    }),
  )
}

makeSchema({
  // Where to export the data
  outputs: {
    schema: `${__dirname}/generated/nexus.graphql`,
    typegen: `${__dirname}/generated/nexus.ts`,
  },
  // all the types to expose
  types: [
    queryType({
      definition(t) {
        allTheThings(t.crud)
      },
    }),
    mutationType({
      definition(t) {
        allTheThings(t.crud)
      },
    }),
    ...parentTypes(),
  ],
  // just few stuff to make this workaround work
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      { source: '@prisma/client', alias: 'client' },
      { source: require.resolve('./context'), alias: 'Context' },
    ],
  },
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
    }),
  ],
})