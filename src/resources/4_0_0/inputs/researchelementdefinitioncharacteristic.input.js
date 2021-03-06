const {
	GraphQLString,
	GraphQLList,
	GraphQLNonNull,
	GraphQLBoolean,
	GraphQLInputObjectType,
} = require('graphql');
const CanonicalScalar = require('../scalars/canonical.scalar.js');
const DateTimeScalar = require('../scalars/datetime.scalar.js');
const CodeScalar = require('../scalars/code.scalar.js');

/**
 * @name exports
 * @summary ResearchElementDefinitioncharacteristic Input Schema
 */
module.exports = new GraphQLInputObjectType({
	name: 'ResearchElementDefinitioncharacteristic_Input',
	description: '',
	fields: () => ({
		_id: {
			type: require('./element.input.js'),
			description:
				'Unique id for the element within a resource (for internal references). This may be any string value that does not contain spaces.',
		},
		id: {
			type: GraphQLString,
			description:
				'Unique id for the element within a resource (for internal references). This may be any string value that does not contain spaces.',
		},
		extension: {
			type: new GraphQLList(require('./extension.input.js')),
			description:
				'May be used to represent additional information that is not part of the basic definition of the element. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.',
		},
		modifierExtension: {
			type: new GraphQLList(require('./extension.input.js')),
			description:
				"May be used to represent additional information that is not part of the basic definition of the element and that modifies the understanding of the element in which it is contained and/or the understanding of the containing element's descendants. Usually modifier elements provide negation or qualification. To make the use of extensions safe and manageable, there is a strict set of governance applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension. Applications processing a resource are required to check for modifier extensions.  Modifier extensions SHALL NOT change the meaning of any elements on Resource or DomainResource (including cannot change the meaning of modifierExtension itself).",
		},
		definitionCodeableConcept: {
			type: new GraphQLNonNull(require('./codeableconcept.input.js')),
			description:
				'Define members of the research element using Codes (such as condition, medication, or observation), Expressions ( using an expression language such as FHIRPath or CQL) or DataRequirements (such as Diabetes diagnosis onset in the last year).',
		},
		_definitionCanonical: {
			type: require('./element.input.js'),
			description:
				'Define members of the research element using Codes (such as condition, medication, or observation), Expressions ( using an expression language such as FHIRPath or CQL) or DataRequirements (such as Diabetes diagnosis onset in the last year).',
		},
		definitionCanonical: {
			type: new GraphQLNonNull(CanonicalScalar),
			description:
				'Define members of the research element using Codes (such as condition, medication, or observation), Expressions ( using an expression language such as FHIRPath or CQL) or DataRequirements (such as Diabetes diagnosis onset in the last year).',
		},
		definitionExpression: {
			type: new GraphQLNonNull(require('./expression.input.js')),
			description:
				'Define members of the research element using Codes (such as condition, medication, or observation), Expressions ( using an expression language such as FHIRPath or CQL) or DataRequirements (such as Diabetes diagnosis onset in the last year).',
		},
		definitionDataRequirement: {
			type: new GraphQLNonNull(require('./datarequirement.input.js')),
			description:
				'Define members of the research element using Codes (such as condition, medication, or observation), Expressions ( using an expression language such as FHIRPath or CQL) or DataRequirements (such as Diabetes diagnosis onset in the last year).',
		},
		usageContext: {
			type: new GraphQLList(require('./usagecontext.input.js')),
			description:
				'Use UsageContext to define the members of the population, such as Age Ranges, Genders, Settings.',
		},
		_exclude: {
			type: require('./element.input.js'),
			description:
				'When true, members with this characteristic are excluded from the element.',
		},
		exclude: {
			type: GraphQLBoolean,
			description:
				'When true, members with this characteristic are excluded from the element.',
		},
		unitOfMeasure: {
			type: require('./codeableconcept.input.js'),
			description: 'Specifies the UCUM unit for the outcome.',
		},
		_studyEffectiveDescription: {
			type: require('./element.input.js'),
			description:
				'A narrative description of the time period the study covers.',
		},
		studyEffectiveDescription: {
			type: GraphQLString,
			description:
				'A narrative description of the time period the study covers.',
		},
		_studyEffectiveDateTime: {
			type: require('./element.input.js'),
			description: 'Indicates what effective period the study covers.',
		},
		studyEffectiveDateTime: {
			type: DateTimeScalar,
			description: 'Indicates what effective period the study covers.',
		},
		studyEffectivePeriod: {
			type: require('./period.input.js'),
			description: 'Indicates what effective period the study covers.',
		},
		studyEffectiveDuration: {
			type: require('./duration.input.js'),
			description: 'Indicates what effective period the study covers.',
		},
		studyEffectiveTiming: {
			type: require('./timing.input.js'),
			description: 'Indicates what effective period the study covers.',
		},
		studyEffectiveTimeFromStart: {
			type: require('./duration.input.js'),
			description: 'Indicates duration from the study initiation.',
		},
		_studyEffectiveGroupMeasure: {
			type: require('./element.input.js'),
			description:
				'Indicates how elements are aggregated within the study effective period.',
		},
		studyEffectiveGroupMeasure: {
			type: CodeScalar,
			description:
				'Indicates how elements are aggregated within the study effective period.',
		},
		_participantEffectiveDescription: {
			type: require('./element.input.js'),
			description:
				'A narrative description of the time period the study covers.',
		},
		participantEffectiveDescription: {
			type: GraphQLString,
			description:
				'A narrative description of the time period the study covers.',
		},
		_participantEffectiveDateTime: {
			type: require('./element.input.js'),
			description: 'Indicates what effective period the study covers.',
		},
		participantEffectiveDateTime: {
			type: DateTimeScalar,
			description: 'Indicates what effective period the study covers.',
		},
		participantEffectivePeriod: {
			type: require('./period.input.js'),
			description: 'Indicates what effective period the study covers.',
		},
		participantEffectiveDuration: {
			type: require('./duration.input.js'),
			description: 'Indicates what effective period the study covers.',
		},
		participantEffectiveTiming: {
			type: require('./timing.input.js'),
			description: 'Indicates what effective period the study covers.',
		},
		participantEffectiveTimeFromStart: {
			type: require('./duration.input.js'),
			description: "Indicates duration from the participant's study entry.",
		},
		_participantEffectiveGroupMeasure: {
			type: require('./element.input.js'),
			description:
				'Indicates how elements are aggregated within the study effective period.',
		},
		participantEffectiveGroupMeasure: {
			type: CodeScalar,
			description:
				'Indicates how elements are aggregated within the study effective period.',
		},
	}),
});
