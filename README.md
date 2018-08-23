# GraphQL-FHIR [![Build Status](https://travis-ci.org/Asymmetrik/graphql-fhir.svg?branch=develop)](https://travis-ci.org/Asymmetrik/graphql-fhir) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
> A secure GraphQL implementation for the [HL7 FHIR specification](https://www.hl7.org/fhir/) based on the current implementation guide for [GraphQL with FHIR](https://build.fhir.org/graphql.html) and developed with Node.js and Express.

## Prerequisites

You should have a basic understanding of working in Node.js and at least a basic understanding of what GraphQL is and how it works.

## Getting Started

1. Installation
```shell
git clone https://github.com/Asymmetrik/graphql-fhir.git
cd graphql-fhir
yarn install
```
2. Start a local dev server
```shell
# For development
yarn nodemon
```
3. View `http://localhost:3000/3_0_1/$graphiql` to explore the available queries and mutations in the graphiql interface. The standard graphql endpoint is available at `http://localhost:3000/3_0_1/$graphql`.


## Next Steps
See the [Architecture](#architecture) section below to get an understanding of how this project is laid out and where things are. We will be adding support to more versions/profiles in the future, but we currently support DSTU2 base (1.0.2) and STU3 base (3.0.1). We enable all resources by default, but give you a way to disable capabilities per resource so you can customize your server's capabilities or slowly add more features over time.


### Architecture

The current folder structure can be seen below. It's designed this way so we can support multiple versions simultaneously and because we plan to generate a lot of this code from [Structure Definitions](https://www.hl7.org/fhir/structuredefinition.html). Specifically everything in `src/resources` will be generated from structure definitions, which will make it very easy to control what your server can and can't do. The code generation tool we used for this will be open sourced soon.

```shell
src
|- config.js
|  # config.js contains application configuration. Be careful when editing this file unless you have
|  # read the code and understand what you are doing. This section is subject to change as we work on
|  # making this repo a little more stable.
|- index.js
|  # index.js is the entry to the application. It grabs the server class and builds the graphql server.
|- src/lib
|  # src/lib directory contains the winston logger and server class. Documentation for these classes
|  # can be seen in code. The server instance is passed to graphql resolvers via context.
|- src/middleware
|  # src/middleware contains various middleware for express. There is an authentication stub that will
|  # eventually be used to connect to OAuth or Smart on FHIR. It currently just calls next and shows
|  # how we can look at the incoming query and make decisions on whether or not to allow the request.
|- src/scripts
|  # src/scripts contains development and test scripts.
|- src/utils
|  # src/utils contains various utilities for routing, error handling and formatting, resolving file
|  # locations in the application, and working with graphql schemas (such as extending fields from
|  # other schemas and validating data against an json).
|- src/resources
|  # src/resources contains all the FHIR resource code for declaring schemas, parameters, custom
|  # types, enums, queries, mutations, resolvers, and what operations you want to support.
|  |- 3_0_1
|  |  # 3_0_1 contains all code related to resources on FHIR version 3.0.1. We may have various
|  |  # version folders alongside this in the future.
|  |  |- inputs
|  |  |  # inputs contains input schemas. This defines inputs for all resource types so they can
|  |  |  # be used as arguments when creating resources, which allows validation on write.
|  |  |- parameters
|  |  |  # parameters defines what arguments can be provided to search operations.
|  |  |- scalars
|  |  |  # scalars contains some custom FHIR types and map to types defined in structure definitions.
|  |  |  # This allows types like datetime, instant, and code to be used as input and output types.
|  |  |  # as well as stricter enforcement on fhir primitives.
|  |  |- schemas
|  |  |  # schemas contains all the output schemas. These will cover all resources from
|  |  |  # BackboneElement to Patient. This currently has the minimum number of schemas to support
|  |  |  # Patient profiles.
|  |  |- profiles
|  |  |  # profiles contains all the queries and mutations for GraphQL. It also contains the
|  |  |  # resolvers, which is where query logic should go, and a index file declaring which
|  |  |  # operations you want to support on the profile.
|  |  |  |- patient
|  |  |  |  # Code for the patient profile will be here. All the files here will eventually be
|  |  |  |  # generated.  You will most likely be using index.js and resolver.js.
|  |  |  |  |- index.js
|  |  |  |  |  # Look at the current version for an example. Initially Read, ReadList, Create,
|  |  |  |  |  # Update, Delete, and InstanceRead are supported. You can remove any one of these
|  |  |  |  |  # operations if you do not want to support them. The server will locate all
|  |  |  |  |  # profiles and add any operations defined in the index.js files.
|  |  |  |  |- mutation.js
|  |  |  |  |  # mutation.js will be generated. Mutations are defined here but included in the app
|  |  |  |  |  # via the index.js file. You should not need to change this file unless your adding
|  |  |  |  |  # nested queries or directive support.
|  |  |  |  |- query.js
|  |  |  |  |  # query.js will be generated. Queries are defined here but included in the app
|  |  |  |  |  # via the index.js file. You should not need to change this file unless your adding
|  |  |  |  |  # nested queries or directive support.
|  |  |  |  |- resolver.js
|  |  |  |  |  # resolver.js contains query logic. This is where you will query your backend and
|  |  |  |  |  # return FHIR formatted data to GraphQL. GraphQL will validate data coming back
|  |  |  |  |  # from your data source and pass the results or errors back to the client.
```

### Config

In `src/config` there are a couple of different things you can configure at the moment. We will be adding more features to this in the future so please be aware that this section is subject to change.

#### Versions

There is a `VERSION` constant in `src/config`. This defines the versions your application can use. It is highly encouraged not to use versions like 'STU3', rather you should use something like '3_0_1' or '3.0.1'. STU3 can be misleading because there are many minor versions and profiles under that umbrella. The versions here also correspond to a resource folder. So for example, if you see 3_0_1 in the VERSION constant, there is also a `src/resources/3_0_1` directory which contains all the code to support that version.

Every key that is present in the VERSION constant will activate that version of FHIR resources for your server. So if your version const looks like this:

```javascript
const VERSION = {
	'1_0_2': '1_0_2',
	'3_0_1': '3_0_1'
};
```

Then your GraphQL server will support both versions at `/1_0_2/$graphql` and `/3_0_1/$graphql`. If you only want to support DSTU2 (1.0.2), then remove the STU3 (3.0.1) key.

### Configuring capabilities

Under `src/resources`, there are version specific directories. In each one, there is a `profiles` directory which contains an `index.js` file that declares that profiles capability. So for example, if you wanted to customize the Patient profile in STU3 (3.0.1), you would edit `src/resources/3_0_1/profiles/patient/index.js`. You can decide whether you want to support a query, list query, create, update, delete, and instance read, or nothing at all.

Supporting nothing is the easiest, just delete the directory or comment out everything in the index.js file. If you want to disable specific capabilities, comment out those in the index.js file. For example, here is a sample patient profile with comments explaining what features you can disable.

```javascript
module.exports = {
	// Comment out to disable all basic queries
	query: {
		// Comment out to disable individual patient read
		Patient: PatientQuery,
		// Comment out to disable querying a bundle of patients
		PatientList: PatientListQuery
	},
	// Comment out to disable all mutations
	mutation: {
		// Comment out to disable creating patients
		PatientCreate: PatientCreateMutation,
		// Comment out to disable updating patients
		PatientUpdate: PatientUpdateMutation,
		// Comment out to disable deleting patients
		PatientDelete: PatientDeleteMutation
	},
	// Comment out to disable instance read, this endpoint would take no arguments
	// and just outfields the user wants back. So /3_0_1/Patient/2/$graphql would
	// be enabled and can return data for patient with unique id 2
	instance_query: {
		name: 'Patient',
		path: '/3_0_1/Patient/:id',
		query: PatientInstanceQuery
	}
}
```

## Frequently Asked Questions
- [What yarn(or npm) commands are available?](./FAQ.md#commands)
- [What server configurations are available and how do I use them?](./FAQ.md#server-configuration)
- [Do you support authentication?](./FAQ.md#authentication)
- [How and where do I write GraphQL resolvers?](./FAQ.md#resolvers)
- [What database's do you support and how do I connect to a database](./FAQ.md#connecting-to-a-database)
- [How do I configure which resources I support and with what capabilities?](./FAQ.md#resource-configuration)
- [How are errors supposed to be handled?](./FAQ.md#error-handling)

## Roadmap for the future
- [x] Authentication Initializers and passport support
- [x] Better documentation on setup and configurations
- [x] Change return format for ResourceList queries to a FHIR Bundle instead of a GraphQLList
- [ ] Implementation guides and demos
- [ ] Support for more resources
	- [ ] USCore resources.
- [ ] Support for more versions
	- [x] DSTU2 (1.0.2).
	- [x] STU3 (3.0.1).
	- [ ] R4

## Contributing
Please see [CONTRIBUTING.md](./.github/CONTRIBUTING.md) for more details regarding contributing issues or code.

## License
`graphql-fhir` is [MIT licensed](./LICENSE).
