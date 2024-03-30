import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { GqlContextType, GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch(RpcException)
export class GrpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const gqlHost = GqlArgumentsHost.create(host);
    if (gqlHost.getType<GqlContextType>() === 'graphql') {
      const gqlResponse = gqlHost.getContext().switchToHttp().getResponse();
      const statusCode = this.getHttpStatus(exception);
      const error = this.transformToGraphQLError(exception);

      gqlResponse.status(statusCode).json({ errors: [error] });
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }

  private getHttpStatus(exception: RpcException): number {
    // Map gRPC exception status codes to HTTP status codes
    // You may need to adjust this mapping based on the types of errors your RPC service returns
    const statusCodeMap: Record<string, number> = {
      UNAUTHENTICATED: HttpStatus.UNAUTHORIZED,
      PERMISSION_DENIED: HttpStatus.FORBIDDEN,
      NOT_FOUND: HttpStatus.NOT_FOUND,
      // Add more cases as needed for other error types
    };
    const grpcError = exception.getError();
    const grpcErrorCode =
      typeof grpcError === 'object' ? grpcError['exceptionName'] : grpcError;
    return statusCodeMap[grpcErrorCode] || HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private transformToGraphQLError(exception: RpcException): GraphQLError {
    // Transform gRPC exception to a GraphQL error
    const errorMessage = exception.getError();
    const message =
      typeof errorMessage === 'object'
        ? errorMessage['error'] || 'Internal Server Error'
        : errorMessage;
    const code =
      typeof errorMessage === 'object'
        ? errorMessage['exceptionName'] || 'INTERNAL_ERROR'
        : 'INTERNAL_ERROR';
    return new GraphQLError(
      message,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      { code },
    );
  }
}
