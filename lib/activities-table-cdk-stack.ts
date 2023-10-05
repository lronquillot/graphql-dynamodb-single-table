import { AuthorizationType, FieldLogLevel, GraphqlApi, MappingTemplate, Schema } from "@aws-cdk/aws-appsync-alpha";
import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { CfnApiKey } from 'aws-cdk-lib/aws-appsync';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

// CONSTANTES
export const APP_NAME = 'activities'
export const MUTATION = 'Mutation';
export const QUERY = 'Query';

// DATOS NO SE PUEDE REPETIR
export const DYNAMO_DB_TABLE = `${APP_NAME}-table`;
export const GRAPHQL_API_KEY = `${APP_NAME}-graphql-key`;
export const GRAPHQL_API_KEY_OUTPUT = `${APP_NAME}-graphql-key-output`;
export const GRAPHQL_URL = `${APP_NAME}-graphql-url`;
export const GRAPHQL_URL_OUTPUT = `${APP_NAME}-graphql-url-output`;

export class ActivitiesTableCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const dynamodbTable = new Table(this, DYNAMO_DB_TABLE, {
      partitionKey: { name: 'PK', type: AttributeType.STRING},
      sortKey: { name: 'SK', type: AttributeType.STRING},
      billingMode: BillingMode.PAY_PER_REQUEST
    })

    const api = new GraphqlApi(this, 'Api', {
      name: `${APP_NAME}-apis`,
      schema: Schema.fromAsset('lib/schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.API_KEY
        }
      },
      logConfig: {
        fieldLogLevel: FieldLogLevel.ALL
      },
      xrayEnabled: true
    })

    const tableDatasource = api.addDynamoDbDataSource(DYNAMO_DB_TABLE, dynamodbTable)

    tableDatasource.createResolver({
      typeName: MUTATION,
      fieldName: 'createArea',
      requestMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Mutation.createArea.request.vtl'),
      responseMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Mutation.createArea.response.vtl'),
    })

    tableDatasource.createResolver({
      typeName: MUTATION,
      fieldName: 'createProject',
      requestMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Mutation.createProject.request.vtl'),
      responseMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Mutation.createProject.response.vtl'),
    })

    tableDatasource.createResolver({
      typeName: MUTATION,
      fieldName: 'createUser',
      requestMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Mutation.createUser.request.vtl'),
      responseMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Mutation.createUser.response.vtl'),
    })
    
    tableDatasource.createResolver({
      typeName: QUERY,
      fieldName: 'getActivities',
      requestMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Query.getActivities.request.vtl'),
      responseMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Query.getActivities.response.vtl'),
    })

    tableDatasource.createResolver({
      typeName: QUERY,
      fieldName: 'getActivity',
      requestMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Query.getActivity.request.vtl'),
      responseMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Query.getActivity.response.vtl'),
    })

    tableDatasource.createResolver({
      typeName: QUERY,
      fieldName: 'getUsers',
      requestMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Query.getUsers.request.vtl'),
      responseMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Query.getUsers.response.vtl'),
    })

    tableDatasource.createResolver({
      typeName: QUERY,
      fieldName: 'getAreas',
      requestMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Query.getAreas.request.vtl'),
      responseMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Query.getAreas.response.vtl'),
    })

    tableDatasource.createResolver({
      typeName: QUERY,
      fieldName: 'getProjects',
      requestMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Query.getProjects.request.vtl'),
      responseMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Query.getProjects.response.vtl'),
    })

    tableDatasource.createResolver({
      typeName: QUERY,
      fieldName: 'getConversation',
      requestMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Query.getConversation.request.vtl'),
      responseMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Query.getConversation.response.vtl'),
    })

    tableDatasource.createResolver({
      typeName: 'Activity',
      fieldName: 'assigned',
      requestMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Activity.user.request.vtl'),
      responseMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Activity.user.response.vtl'),
    })

    tableDatasource.createResolver({
      typeName: 'Activity',
      fieldName: 'conversation',
      requestMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Activity.conversation.request.vtl'),
      responseMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Activity.conversation.response.vtl'),
    })

    tableDatasource.createResolver({
      typeName: 'Activity',
      fieldName: 'notifications',
      requestMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Activity.notifications.request.vtl'),
      responseMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Activity.notifications.response.vtl'),
    })

    tableDatasource.createResolver({
      typeName: 'Activity',
      fieldName: 'tracking',
      requestMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Activity.tracking.request.vtl'),
      responseMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Activity.tracking.response.vtl'),
    })

    tableDatasource.createResolver({
      typeName: 'Area',
      fieldName: 'inCharge',
      requestMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Area.user.request.vtl'),
      responseMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Area.user.response.vtl'),
    })

    tableDatasource.createResolver({
      typeName: 'Area',
      fieldName: 'father',
      requestMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Area.father.request.vtl'),
      responseMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Area.father.response.vtl'),
    })

    tableDatasource.createResolver({
      typeName: 'Area',
      fieldName: 'children',
      requestMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Area.children.request.vtl'),
      responseMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Area.children.response.vtl'),
    })

    tableDatasource.createResolver({
      typeName: 'Area',
      fieldName: 'projects',
      requestMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Area.projects.request.vtl'),
      responseMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Area.projects.response.vtl'),
    })

    tableDatasource.createResolver({
      typeName: 'Project',
      fieldName: 'activities',
      requestMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Projects.activities.request.vtl'),
      responseMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Projects.activities.response.vtl'),
    })

    tableDatasource.createResolver({
      typeName: 'Notification',
      fieldName: 'attachments',
      requestMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Notification.attachments.request.vtl'),
      responseMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Notification.attachments.response.vtl'),
    })

    tableDatasource.createResolver({
      typeName: 'Tracking',
      fieldName: 'user',
      requestMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Tracking.user.request.vtl'),
      responseMappingTemplate: MappingTemplate.fromFile('lib/mapping-templates/Tracking.user.response.vtl'),
    })

    const apiKey = new CfnApiKey(this, GRAPHQL_API_KEY, {
      apiId: api.apiId
    })

    new CfnOutput(this, GRAPHQL_URL_OUTPUT, {
      value: api.graphqlUrl,
      exportName: GRAPHQL_URL
    })

    new CfnOutput(this, GRAPHQL_API_KEY_OUTPUT, {
      value: apiKey.attrApiKey,
      exportName: GRAPHQL_API_KEY
    })
  }
}
