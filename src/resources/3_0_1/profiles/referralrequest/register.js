const {
	ReferralRequestCreateMutation,
	ReferralRequestUpdateMutation,
	ReferralRequestRemoveMutation,
} = require('./mutation');

const {
	ReferralRequestQuery,
	ReferralRequestListQuery,
	ReferralRequestInstanceQuery,
} = require('./query');

/**
 * @name exports
 * @static
 * @summary GraphQL Configurations. This is needed to register this profile
 * with the GraphQL server.
 */
module.exports = {
	/**
	 * Define Query Schema's here
	 * Each profile will need to define the two queries it supports
	 * and these keys must be unique across the entire application, like routes
	 */
	query: {
		ReferralRequest: ReferralRequestQuery,
		ReferralRequestList: ReferralRequestListQuery,
	},
	/**
	 * Define Mutation Schema's here
	 * Each profile will need to define the supported mutations
	 * and these keys must be unique across the entire application, like routes
	 */
	mutation: {
		ReferralRequestCreate: ReferralRequestCreateMutation,
		ReferralRequestUpdate: ReferralRequestUpdateMutation,
		ReferralRequestRemove: ReferralRequestRemoveMutation,
	},
	/**
	 * These properties are so the core router can setup the approriate endpoint
	 * for a direct query against a resource
	 */
	instance: {
		name: 'ReferralRequest',
		path: '/3_0_1/ReferralRequest/:id',
		query: ReferralRequestInstanceQuery,
	},
};
