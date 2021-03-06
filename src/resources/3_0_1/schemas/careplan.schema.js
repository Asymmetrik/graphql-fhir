const {
	GraphQLNonNull,
	GraphQLEnumType,
	GraphQLList,
	GraphQLUnionType,
	GraphQLString,
	GraphQLObjectType,
} = require('graphql');
const IdScalar = require('../scalars/id.scalar.js');
const UriScalar = require('../scalars/uri.scalar.js');
const CodeScalar = require('../scalars/code.scalar.js');

/**
 * @name exports
 * @summary CarePlan Schema
 */
module.exports = new GraphQLObjectType({
	name: 'CarePlan',
	description: 'Base StructureDefinition for CarePlan Resource',
	fields: () => ({
		resourceType: {
			type: new GraphQLNonNull(
				new GraphQLEnumType({
					name: 'CarePlan_Enum_schema',
					values: { CarePlan: { value: 'CarePlan' } },
				}),
			),
			description: 'Type of resource',
		},
		_id: {
			type: require('./element.schema.js'),
			description:
				'The logical id of the resource, as used in the URL for the resource. Once assigned, this value never changes.',
		},
		id: {
			type: IdScalar,
			description:
				'The logical id of the resource, as used in the URL for the resource. Once assigned, this value never changes.',
		},
		meta: {
			type: require('./meta.schema.js'),
			description:
				'The metadata about the resource. This is content that is maintained by the infrastructure. Changes to the content may not always be associated with version changes to the resource.',
		},
		_implicitRules: {
			type: require('./element.schema.js'),
			description:
				'A reference to a set of rules that were followed when the resource was constructed, and which must be understood when processing the content.',
		},
		implicitRules: {
			type: UriScalar,
			description:
				'A reference to a set of rules that were followed when the resource was constructed, and which must be understood when processing the content.',
		},
		_language: {
			type: require('./element.schema.js'),
			description: 'The base language in which the resource is written.',
		},
		// valueSetReference: http://hl7.org/fhir/ValueSet/languages
		language: {
			type: CodeScalar,
			description: 'The base language in which the resource is written.',
		},
		text: {
			type: require('./narrative.schema.js'),
			description:
				"A human-readable narrative that contains a summary of the resource, and may be used to represent the content of the resource to a human. The narrative need not encode all the structured data, but is required to contain sufficient detail to make it 'clinically safe' for a human to just read the narrative. Resource definitions may define what content should be represented in the narrative to ensure clinical safety.",
		},
		contained: {
			type: new GraphQLList(require('./resourcelist.schema')),
			description:
				'These resources do not have an independent existence apart from the resource that contains them - they cannot be identified independently, and nor can they have their own independent transaction scope.',
		},
		extension: {
			type: new GraphQLList(require('./extension.schema.js')),
			description:
				'May be used to represent additional information that is not part of the basic definition of the resource. In order to make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer is allowed to define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.',
		},
		modifierExtension: {
			type: new GraphQLList(require('./extension.schema.js')),
			description:
				'May be used to represent additional information that is not part of the basic definition of the resource, and that modifies the understanding of the element that contains it. Usually modifier elements provide negation or qualification. In order to make the use of extensions safe and manageable, there is a strict set of governance applied to the definition and use of extensions. Though any implementer is allowed to define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension. Applications processing a resource are required to check for modifier extensions.',
		},
		identifier: {
			type: new GraphQLList(require('./identifier.schema.js')),
			description:
				'This records identifiers associated with this care plan that are defined by business processes and/or used to refer to it when a direct URL reference to the resource itself is not appropriate (e.g. in CDA documents, or in written / printed documentation).',
		},
		definition: {
			type: new GraphQLList(
				new GraphQLUnionType({
					name: 'CarePlandefinition_definition_Union',
					description:
						'Identifies the protocol, questionnaire, guideline or other specification the care plan should be conducted in accordance with.',
					types: () => [
						require('./plandefinition.schema.js'),
						require('./questionnaire.schema.js'),
					],
					resolveType(data) {
						if (data && data.resourceType === 'PlanDefinition') {
							return require('./plandefinition.schema.js');
						}
						if (data && data.resourceType === 'Questionnaire') {
							return require('./questionnaire.schema.js');
						}
					},
				}),
			),
			description:
				'Identifies the protocol, questionnaire, guideline or other specification the care plan should be conducted in accordance with.',
		},
		basedOn: {
			type: new GraphQLList(
				new GraphQLUnionType({
					name: 'CarePlanbasedOn_basedOn_Union',
					description:
						'A care plan that is fulfilled in whole or in part by this care plan.',
					types: () => [require('./careplan.schema.js')],
					resolveType(data) {
						if (data && data.resourceType === 'CarePlan') {
							return require('./careplan.schema.js');
						}
					},
				}),
			),
			description:
				'A care plan that is fulfilled in whole or in part by this care plan.',
		},
		replaces: {
			type: new GraphQLList(
				new GraphQLUnionType({
					name: 'CarePlanreplaces_replaces_Union',
					description:
						'Completed or terminated care plan whose function is taken by this new care plan.',
					types: () => [require('./careplan.schema.js')],
					resolveType(data) {
						if (data && data.resourceType === 'CarePlan') {
							return require('./careplan.schema.js');
						}
					},
				}),
			),
			description:
				'Completed or terminated care plan whose function is taken by this new care plan.',
		},
		partOf: {
			type: new GraphQLList(
				new GraphQLUnionType({
					name: 'CarePlanpartOf_partOf_Union',
					description:
						'A larger care plan of which this particular care plan is a component or step.',
					types: () => [require('./careplan.schema.js')],
					resolveType(data) {
						if (data && data.resourceType === 'CarePlan') {
							return require('./careplan.schema.js');
						}
					},
				}),
			),
			description:
				'A larger care plan of which this particular care plan is a component or step.',
		},
		_status: {
			type: require('./element.schema.js'),
			description:
				'Indicates whether the plan is currently being acted upon, represents future intentions or is now a historical record.',
		},
		// valueSetReference: http://hl7.org/fhir/ValueSet/care-plan-status
		status: {
			type: new GraphQLNonNull(CodeScalar),
			description:
				'Indicates whether the plan is currently being acted upon, represents future intentions or is now a historical record.',
		},
		_intent: {
			type: require('./element.schema.js'),
			description:
				'Indicates the level of authority/intentionality associated with the care plan and where the care plan fits into the workflow chain.',
		},
		// valueSetReference: http://hl7.org/fhir/ValueSet/care-plan-intent
		intent: {
			type: new GraphQLNonNull(CodeScalar),
			description:
				'Indicates the level of authority/intentionality associated with the care plan and where the care plan fits into the workflow chain.',
		},
		// valueSetReference: http://hl7.org/fhir/ValueSet/care-plan-category
		category: {
			type: new GraphQLList(require('./codeableconcept.schema.js')),
			description:
				"Identifies what 'kind' of plan this is to support differentiation between multiple co-existing plans; e.g. 'Home health', 'psychiatric', 'asthma', 'disease management', 'wellness plan', etc.",
		},
		_title: {
			type: require('./element.schema.js'),
			description: 'Human-friendly name for the CarePlan.',
		},
		title: {
			type: GraphQLString,
			description: 'Human-friendly name for the CarePlan.',
		},
		_description: {
			type: require('./element.schema.js'),
			description: 'A description of the scope and nature of the plan.',
		},
		description: {
			type: GraphQLString,
			description: 'A description of the scope and nature of the plan.',
		},
		subject: {
			type: new GraphQLNonNull(
				new GraphQLUnionType({
					name: 'CarePlansubject_subject_Union',
					description:
						'Identifies the patient or group whose intended care is described by the plan.',
					types: () => [
						require('./patient.schema.js'),
						require('./group.schema.js'),
					],
					resolveType(data) {
						if (data && data.resourceType === 'Patient') {
							return require('./patient.schema.js');
						}
						if (data && data.resourceType === 'Group') {
							return require('./group.schema.js');
						}
					},
				}),
			),
			description:
				'Identifies the patient or group whose intended care is described by the plan.',
		},
		context: {
			type: new GraphQLUnionType({
				name: 'CarePlancontext_context_Union',
				description:
					'Identifies the original context in which this particular CarePlan was created.',
				types: () => [
					require('./encounter.schema.js'),
					require('./episodeofcare.schema.js'),
				],
				resolveType(data) {
					if (data && data.resourceType === 'Encounter') {
						return require('./encounter.schema.js');
					}
					if (data && data.resourceType === 'EpisodeOfCare') {
						return require('./episodeofcare.schema.js');
					}
				},
			}),
			description:
				'Identifies the original context in which this particular CarePlan was created.',
		},
		period: {
			type: require('./period.schema.js'),
			description:
				'Indicates when the plan did (or is intended to) come into effect and end.',
		},
		author: {
			type: new GraphQLList(
				new GraphQLUnionType({
					name: 'CarePlanauthor_author_Union',
					description:
						'Identifies the individual(s) or ogranization who is responsible for the content of the care plan.',
					types: () => [
						require('./patient.schema.js'),
						require('./practitioner.schema.js'),
						require('./relatedperson.schema.js'),
						require('./organization.schema.js'),
						require('./careteam.schema.js'),
					],
					resolveType(data) {
						if (data && data.resourceType === 'Patient') {
							return require('./patient.schema.js');
						}
						if (data && data.resourceType === 'Practitioner') {
							return require('./practitioner.schema.js');
						}
						if (data && data.resourceType === 'RelatedPerson') {
							return require('./relatedperson.schema.js');
						}
						if (data && data.resourceType === 'Organization') {
							return require('./organization.schema.js');
						}
						if (data && data.resourceType === 'CareTeam') {
							return require('./careteam.schema.js');
						}
					},
				}),
			),
			description:
				'Identifies the individual(s) or ogranization who is responsible for the content of the care plan.',
		},
		careTeam: {
			type: new GraphQLList(
				new GraphQLUnionType({
					name: 'CarePlancareTeam_careTeam_Union',
					description:
						'Identifies all people and organizations who are expected to be involved in the care envisioned by this plan.',
					types: () => [require('./careteam.schema.js')],
					resolveType(data) {
						if (data && data.resourceType === 'CareTeam') {
							return require('./careteam.schema.js');
						}
					},
				}),
			),
			description:
				'Identifies all people and organizations who are expected to be involved in the care envisioned by this plan.',
		},
		addresses: {
			type: new GraphQLList(
				new GraphQLUnionType({
					name: 'CarePlanaddresses_addresses_Union',
					description:
						'Identifies the conditions/problems/concerns/diagnoses/etc. whose management and/or mitigation are handled by this plan.',
					types: () => [require('./condition.schema.js')],
					resolveType(data) {
						if (data && data.resourceType === 'Condition') {
							return require('./condition.schema.js');
						}
					},
				}),
			),
			description:
				'Identifies the conditions/problems/concerns/diagnoses/etc. whose management and/or mitigation are handled by this plan.',
		},
		supportingInfo: {
			type: new GraphQLList(
				new GraphQLUnionType({
					name: 'CarePlansupportingInfo_supportingInfo_Union',
					description:
						"Identifies portions of the patient's record that specifically influenced the formation of the plan.  These might include co-morbidities, recent procedures, limitations, recent assessments, etc.",
					types: () => [require('./resource.schema.js')],
					resolveType(data) {
						if (data && data.resourceType === 'Resource') {
							return require('./resource.schema.js');
						}
					},
				}),
			),
			description:
				"Identifies portions of the patient's record that specifically influenced the formation of the plan.  These might include co-morbidities, recent procedures, limitations, recent assessments, etc.",
		},
		goal: {
			type: new GraphQLList(
				new GraphQLUnionType({
					name: 'CarePlangoal_goal_Union',
					description:
						'Describes the intended objective(s) of carrying out the care plan.',
					types: () => [require('./goal.schema.js')],
					resolveType(data) {
						if (data && data.resourceType === 'Goal') {
							return require('./goal.schema.js');
						}
					},
				}),
			),
			description:
				'Describes the intended objective(s) of carrying out the care plan.',
		},
		activity: {
			type: new GraphQLList(require('./careplanactivity.schema.js')),
			description:
				'Identifies a planned action to occur as part of the plan.  For example, a medication to be used, lab tests to perform, self-monitoring, education, etc.',
		},
		note: {
			type: new GraphQLList(require('./annotation.schema.js')),
			description: 'General notes about the care plan not covered elsewhere.',
		},
	}),
});
