const errorUtils = require('../../../../utils/error.utils');
const { COLLECTION } = require('../../../../constants');
const mongo_provider = require('../../../../providers/mongo.common');
const resource_name = 'Claim';
const collection_name = COLLECTION.CLAIM;
/**
 * @name exports.getClaim
 * @static
 * @summary Claim resolver.
 */
module.exports.getClaim = (root, args, context, info) => 
	mongo_provider.searchById(args, context, resource_name, collection_name);

/**
 * @name exports.getClaimList
 * @static
 * @summary Claim list resolver.
 */
module.exports.getClaimList = (root, args, context = {}, info) => 
	mongo_provider.search(args, context, resource_name, collection_name);

/**
 * @name exports.getClaimInstance
 * @static
 * @summary Claim instance resolver.
 */
module.exports.getClaimInstance = function getClaimInstance(
	root,
	args,
	context = {},
	info,
) {
	let db = context.server.db;
  	let version = context.version;
  	let logger = context.server.logger;
	return new Promise((resolve, reject) => {
		const claims = db.collection(collection_name);
		let claim = claims.findOne({ _id: args._id }).then(
			(claim)=> {
				if (!claim){
					resolve({});
				}
				else {
					resolve(claim.resource);
				}
			},
			(err)=> {
				logger.error(err);
				let error = errorUtils.internal(version, err.message);
				reject(errorUtils.formatErrorForGraphQL(error));
			}
		);

	  });
};

/**
 * @name exports.createClaim
 * @static
 * @summary Create Claim resolver.
 */
module.exports.createClaim =(root,args,context = {},info) => 
	mongo_provider.create(args, context, resource_name, collection_name);
	
/**
 * @name exports.updateClaim
 * @static
 * @summary Update Claim resolver.
 */
module.exports.updateClaim = function updateClaim(root,args,context = {},info,) {
	let db = context.server.db;
    let version = context.version;
    let logger = context.server.logger;
    return new Promise((resolve, reject) => {
        const claim = args.resource;
        const claims = db.collection(collection_name);
        claims.updateOne({_id: args.id}, 
            { $set: {claim}}, 
            { upsert:true }, (err, result) => {
            if (err) {
              logger.error(err);
              let error = errorUtils.internal(version, err.message);
              reject(errorUtils.formatErrorForGraphQL(error));
            } else {
                resolve(args.resource);
            }
          });
    });
};

/**
 * @name exports.removeClaim
 * @static
 * @summary Remove Claim resolver.
 */
module.exports.removeClaim = function removeClaim(
	root,
	args,
	context = {},
	info,
) {
	let db = context.server.db;
    let version = context.version;
    let logger = context.server.logger;
    return new Promise((resolve, reject) => {
        const claims = db.collection(collection_name);
        claims.deleteOne({_id: args.id}, (err) => {
            if (err) {
              logger.error(err);
              let error = errorUtils.internal(version, err.message);
              reject(errorUtils.formatErrorForGraphQL(error));
            } else {
                resolve ( {id: args.id});
            }
          });
    });
};
