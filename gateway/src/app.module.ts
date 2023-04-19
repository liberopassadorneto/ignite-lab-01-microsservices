import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        context: ({ req }) => {
          return { headers: req.headers };
        },
      },

      gateway: {
        // Merge the schemas (graphs) of all the microservices (purchases and classrooms)
        // So, create a supergraph
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'purchases',
              url: 'http://localhost:3333/graphql',
            },
            {
              name: 'classrooms',
              url: 'http://localhost:3334/graphql',
            },
          ],
        }),
        buildService: ({ url }) => {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
              request.http.headers.set(
                'authorization',
                context?.['headers']?.['authorization'],
              );
            },
          });
        },
      },
    }),
  ],
})
export class AppModule {}
