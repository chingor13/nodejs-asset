// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

import * as gax from 'google-gax';
import {
  APICallback,
  Callback,
  CallOptions,
  Descriptors,
  ClientOptions,
  LROperation,
} from 'google-gax';
import * as path from 'path';

import * as protosTypes from '../../protos/protos';
import * as gapicConfig from './asset_service_client_config.json';

const version = require('../../../package.json').version;

/**
 *  Asset service definition.
 * @class
 * @memberof v1
 */
export class AssetServiceClient {
  private _descriptors: Descriptors = {page: {}, stream: {}, longrunning: {}};
  private _innerApiCalls: {[name: string]: Function};
  private _pathTemplates: {[name: string]: gax.PathTemplate};
  private _terminated = false;
  private _opts: ClientOptions;
  private _gaxModule: typeof gax | typeof gax.fallback;
  private _gaxGrpc: gax.GrpcClient | gax.fallback.GrpcClient;
  private _protos: {};
  private _defaults: {[method: string]: gax.CallSettings};
  auth: gax.GoogleAuth;
  operationsClient: gax.OperationsClient;
  assetServiceStub?: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of AssetServiceClient.
   *
   * @param {object} [options] - The configuration object. See the subsequent
   *   parameters for more details.
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   */

  constructor(opts?: ClientOptions) {
    // Ensure that options include the service address and port.
    const staticMembers = this.constructor as typeof AssetServiceClient;
    const servicePath =
      opts && opts.servicePath
        ? opts.servicePath
        : opts && opts.apiEndpoint
        ? opts.apiEndpoint
        : staticMembers.servicePath;
    const port = opts && opts.port ? opts.port : staticMembers.port;

    if (!opts) {
      opts = {servicePath, port};
    }
    opts.servicePath = opts.servicePath || servicePath;
    opts.port = opts.port || port;
    opts.clientConfig = opts.clientConfig || {};

    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      opts.fallback = true;
    }
    // If we are in browser, we are already using fallback because of the
    // "browser" field in package.json.
    // But if we were explicitly requested to use fallback, let's do it now.
    this._gaxModule = !isBrowser && opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options
    // sent to the client.
    opts.scopes = (this.constructor as typeof AssetServiceClient).scopes;
    this._gaxGrpc = new this._gaxModule.GrpcClient(opts);

    // Save options to use in initialize() method.
    this._opts = opts;

    // Save the auth object to the client, for use by other methods.
    this.auth = this._gaxGrpc.auth as gax.GoogleAuth;

    // Determine the client header string.
    const clientHeader = [`gax/${this._gaxModule.version}`, `gapic/${version}`];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${this._gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${this._gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    // For Node.js, pass the path to JSON proto file.
    // For browsers, pass the JSON content.

    const nodejsProtoPath = path.join(
      __dirname,
      '..',
      '..',
      'protos',
      'protos.json'
    );
    this._protos = this._gaxGrpc.loadProto(
      opts.fallback ? require('../../protos/protos.json') : nodejsProtoPath
    );

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this._pathTemplates = {
      folderFeedPathTemplate: new this._gaxModule.PathTemplate(
        'folders/{folder}/feeds/{feed}'
      ),
      organizationFeedPathTemplate: new this._gaxModule.PathTemplate(
        'organizations/{organization}/feeds/{feed}'
      ),
      projectFeedPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/feeds/{feed}'
      ),
    };

    // This API contains "long-running operations", which return a
    // an Operation object that allows for tracking of the operation,
    // rather than holding a request open.
    const protoFilesRoot = opts.fallback
      ? this._gaxModule.protobuf.Root.fromJSON(
          require('../../protos/protos.json')
        )
      : this._gaxModule.protobuf.loadSync(nodejsProtoPath);

    this.operationsClient = this._gaxModule
      .lro({
        auth: this.auth,
        grpc: 'grpc' in this._gaxGrpc ? this._gaxGrpc.grpc : undefined,
      })
      .operationsClient(opts);
    const exportAssetsResponse = protoFilesRoot.lookup(
      '.google.cloud.asset.v1.ExportAssetsResponse'
    ) as gax.protobuf.Type;
    const exportAssetsMetadata = protoFilesRoot.lookup(
      '.google.cloud.asset.v1.ExportAssetsRequest'
    ) as gax.protobuf.Type;

    this._descriptors.longrunning = {
      exportAssets: new this._gaxModule.LongrunningDescriptor(
        this.operationsClient,
        exportAssetsResponse.decode.bind(exportAssetsResponse),
        exportAssetsMetadata.decode.bind(exportAssetsMetadata)
      ),
    };

    // Put together the default options sent with requests.
    this._defaults = this._gaxGrpc.constructSettings(
      'google.cloud.asset.v1.AssetService',
      gapicConfig as gax.ClientConfig,
      opts.clientConfig || {},
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this._innerApiCalls = {};
  }

  /**
   * Initialize the client.
   * Performs asynchronous operations (such as authentication) and prepares the client.
   * This function will be called automatically when any class method is called for the
   * first time, but if you need to initialize it before calling an actual method,
   * feel free to call initialize() directly.
   *
   * You can await on this method if you want to make sure the client is initialized.
   *
   * @returns {Promise} A promise that resolves to an authenticated service stub.
   */
  initialize() {
    // If the client stub promise is already initialized, return immediately.
    if (this.assetServiceStub) {
      return this.assetServiceStub;
    }

    // Put together the "service stub" for
    // google.cloud.asset.v1.AssetService.
    this.assetServiceStub = this._gaxGrpc.createStub(
      this._opts.fallback
        ? (this._protos as protobuf.Root).lookupService(
            'google.cloud.asset.v1.AssetService'
          )
        : // tslint:disable-next-line no-any
          (this._protos as any).google.cloud.asset.v1.AssetService,
      this._opts
    ) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const assetServiceStubMethods = [
      'exportAssets',
      'batchGetAssetsHistory',
      'createFeed',
      'getFeed',
      'listFeeds',
      'updateFeed',
      'deleteFeed',
    ];

    for (const methodName of assetServiceStubMethods) {
      const innerCallPromise = this.assetServiceStub.then(
        stub => (...args: Array<{}>) => {
          if (this._terminated) {
            return Promise.reject('The client has already been closed.');
          }
          return stub[methodName].apply(stub, args);
        },
        (err: Error | null | undefined) => () => {
          throw err;
        }
      );

      const apiCall = this._gaxModule.createApiCall(
        innerCallPromise,
        this._defaults[methodName],
        this._descriptors.page[methodName] ||
          this._descriptors.stream[methodName] ||
          this._descriptors.longrunning[methodName]
      );

      this._innerApiCalls[methodName] = (
        argument: {},
        callOptions?: CallOptions,
        callback?: APICallback
      ) => {
        return apiCall(argument, callOptions, callback);
      };
    }

    return this.assetServiceStub;
  }

  /**
   * The DNS address for this API service.
   */
  static get servicePath() {
    return 'cloudasset.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   */
  static get apiEndpoint() {
    return 'cloudasset.googleapis.com';
  }

  /**
   * The port for this API service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   */
  static get scopes() {
    return ['https://www.googleapis.com/auth/cloud-platform'];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @param {function(Error, string)} callback - the callback to
   *   be called with the current project Id.
   */
  getProjectId(
    callback?: Callback<string, undefined, undefined>
  ): Promise<string> | void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------
  batchGetAssetsHistory(
    request: protosTypes.google.cloud.asset.v1.IBatchGetAssetsHistoryRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.asset.v1.IBatchGetAssetsHistoryResponse,
      (
        | protosTypes.google.cloud.asset.v1.IBatchGetAssetsHistoryRequest
        | undefined
      ),
      {} | undefined
    ]
  >;
  batchGetAssetsHistory(
    request: protosTypes.google.cloud.asset.v1.IBatchGetAssetsHistoryRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.asset.v1.IBatchGetAssetsHistoryResponse,
      | protosTypes.google.cloud.asset.v1.IBatchGetAssetsHistoryRequest
      | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Batch gets the update history of assets that overlap a time window.
   * For RESOURCE content, this API outputs history with asset in both
   * non-delete or deleted status.
   * For IAM_POLICY content, this API outputs history when the asset and its
   * attached IAM POLICY both exist. This can create gaps in the output history.
   * If a specified asset does not exist, this API returns an INVALID_ARGUMENT
   * error.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The relative name of the root asset. It can only be an
   *   organization number (such as "organizations/123"), a project ID (such as
   *   "projects/my-project-id")", or a project number (such as "projects/12345").
   * @param {string[]} request.assetNames
   *   A list of the full names of the assets. For example:
   *   `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`.
   *   See [Resource
   *   Names](https://cloud.google.com/apis/design/resource_names#full_resource_name)
   *   and [Resource Name
   *   Format](https://cloud.google.com/asset-inventory/docs/resource-name-format)
   *   for more info.
   *
   *   The request becomes a no-op if the asset name list is empty, and the max
   *   size of the asset name list is 100 in one request.
   * @param {google.cloud.asset.v1.ContentType} [request.contentType]
   *   Optional. The content type.
   * @param {google.cloud.asset.v1.TimeWindow} [request.readTimeWindow]
   *   Optional. The time window for the asset history. Both start_time and
   *   end_time are optional and if set, it must be after 2018-10-02 UTC. If
   *   end_time is not set, it is default to current timestamp. If start_time is
   *   not set, the snapshot of the assets at end_time will be returned. The
   *   returned results contain all temporal assets whose time window overlap with
   *   read_time_window.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [BatchGetAssetsHistoryResponse]{@link google.cloud.asset.v1.BatchGetAssetsHistoryResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  batchGetAssetsHistory(
    request: protosTypes.google.cloud.asset.v1.IBatchGetAssetsHistoryRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.asset.v1.IBatchGetAssetsHistoryResponse,
          | protosTypes.google.cloud.asset.v1.IBatchGetAssetsHistoryRequest
          | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.cloud.asset.v1.IBatchGetAssetsHistoryResponse,
      | protosTypes.google.cloud.asset.v1.IBatchGetAssetsHistoryRequest
      | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.cloud.asset.v1.IBatchGetAssetsHistoryResponse,
      (
        | protosTypes.google.cloud.asset.v1.IBatchGetAssetsHistoryRequest
        | undefined
      ),
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent || '',
    });
    this.initialize();
    return this._innerApiCalls.batchGetAssetsHistory(
      request,
      options,
      callback
    );
  }
  createFeed(
    request: protosTypes.google.cloud.asset.v1.ICreateFeedRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.asset.v1.IFeed,
      protosTypes.google.cloud.asset.v1.ICreateFeedRequest | undefined,
      {} | undefined
    ]
  >;
  createFeed(
    request: protosTypes.google.cloud.asset.v1.ICreateFeedRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.asset.v1.IFeed,
      protosTypes.google.cloud.asset.v1.ICreateFeedRequest | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Creates a feed in a parent project/folder/organization to listen to its
   * asset updates.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The name of the project/folder/organization where this feed
   *   should be created in. It can only be an organization number (such as
   *   "organizations/123"), a folder number (such as "folders/123"), a project ID
   *   (such as "projects/my-project-id")", or a project number (such as
   *   "projects/12345").
   * @param {string} request.feedId
   *   Required. This is the client-assigned asset feed identifier and it needs to
   *   be unique under a specific parent project/folder/organization.
   * @param {google.cloud.asset.v1.Feed} request.feed
   *   Required. The feed details. The field `name` must be empty and it will be generated
   *   in the format of:
   *   projects/project_number/feeds/feed_id
   *   folders/folder_number/feeds/feed_id
   *   organizations/organization_number/feeds/feed_id
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Feed]{@link google.cloud.asset.v1.Feed}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  createFeed(
    request: protosTypes.google.cloud.asset.v1.ICreateFeedRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.asset.v1.IFeed,
          protosTypes.google.cloud.asset.v1.ICreateFeedRequest | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.cloud.asset.v1.IFeed,
      protosTypes.google.cloud.asset.v1.ICreateFeedRequest | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.cloud.asset.v1.IFeed,
      protosTypes.google.cloud.asset.v1.ICreateFeedRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent || '',
    });
    this.initialize();
    return this._innerApiCalls.createFeed(request, options, callback);
  }
  getFeed(
    request: protosTypes.google.cloud.asset.v1.IGetFeedRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.asset.v1.IFeed,
      protosTypes.google.cloud.asset.v1.IGetFeedRequest | undefined,
      {} | undefined
    ]
  >;
  getFeed(
    request: protosTypes.google.cloud.asset.v1.IGetFeedRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.asset.v1.IFeed,
      protosTypes.google.cloud.asset.v1.IGetFeedRequest | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Gets details about an asset feed.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   Required. The name of the Feed and it must be in the format of:
   *   projects/project_number/feeds/feed_id
   *   folders/folder_number/feeds/feed_id
   *   organizations/organization_number/feeds/feed_id
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Feed]{@link google.cloud.asset.v1.Feed}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  getFeed(
    request: protosTypes.google.cloud.asset.v1.IGetFeedRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.asset.v1.IFeed,
          protosTypes.google.cloud.asset.v1.IGetFeedRequest | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.cloud.asset.v1.IFeed,
      protosTypes.google.cloud.asset.v1.IGetFeedRequest | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.cloud.asset.v1.IFeed,
      protosTypes.google.cloud.asset.v1.IGetFeedRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name || '',
    });
    this.initialize();
    return this._innerApiCalls.getFeed(request, options, callback);
  }
  listFeeds(
    request: protosTypes.google.cloud.asset.v1.IListFeedsRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.asset.v1.IListFeedsResponse,
      protosTypes.google.cloud.asset.v1.IListFeedsRequest | undefined,
      {} | undefined
    ]
  >;
  listFeeds(
    request: protosTypes.google.cloud.asset.v1.IListFeedsRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.asset.v1.IListFeedsResponse,
      protosTypes.google.cloud.asset.v1.IListFeedsRequest | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Lists all asset feeds in a parent project/folder/organization.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The parent project/folder/organization whose feeds are to be
   *   listed. It can only be using project/folder/organization number (such as
   *   "folders/12345")", or a project ID (such as "projects/my-project-id").
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [ListFeedsResponse]{@link google.cloud.asset.v1.ListFeedsResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  listFeeds(
    request: protosTypes.google.cloud.asset.v1.IListFeedsRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.asset.v1.IListFeedsResponse,
          protosTypes.google.cloud.asset.v1.IListFeedsRequest | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.cloud.asset.v1.IListFeedsResponse,
      protosTypes.google.cloud.asset.v1.IListFeedsRequest | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.cloud.asset.v1.IListFeedsResponse,
      protosTypes.google.cloud.asset.v1.IListFeedsRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent || '',
    });
    this.initialize();
    return this._innerApiCalls.listFeeds(request, options, callback);
  }
  updateFeed(
    request: protosTypes.google.cloud.asset.v1.IUpdateFeedRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.asset.v1.IFeed,
      protosTypes.google.cloud.asset.v1.IUpdateFeedRequest | undefined,
      {} | undefined
    ]
  >;
  updateFeed(
    request: protosTypes.google.cloud.asset.v1.IUpdateFeedRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.asset.v1.IFeed,
      protosTypes.google.cloud.asset.v1.IUpdateFeedRequest | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Updates an asset feed configuration.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {google.cloud.asset.v1.Feed} request.feed
   *   Required. The new values of feed details. It must match an existing feed and the
   *   field `name` must be in the format of:
   *   projects/project_number/feeds/feed_id or
   *   folders/folder_number/feeds/feed_id or
   *   organizations/organization_number/feeds/feed_id.
   * @param {google.protobuf.FieldMask} request.updateMask
   *   Required. Only updates the `feed` fields indicated by this mask.
   *   The field mask must not be empty, and it must not contain fields that
   *   are immutable or only set by the server.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Feed]{@link google.cloud.asset.v1.Feed}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  updateFeed(
    request: protosTypes.google.cloud.asset.v1.IUpdateFeedRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.asset.v1.IFeed,
          protosTypes.google.cloud.asset.v1.IUpdateFeedRequest | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.cloud.asset.v1.IFeed,
      protosTypes.google.cloud.asset.v1.IUpdateFeedRequest | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.cloud.asset.v1.IFeed,
      protosTypes.google.cloud.asset.v1.IUpdateFeedRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'feed.name': request.feed!.name || '',
    });
    this.initialize();
    return this._innerApiCalls.updateFeed(request, options, callback);
  }
  deleteFeed(
    request: protosTypes.google.cloud.asset.v1.IDeleteFeedRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.protobuf.IEmpty,
      protosTypes.google.cloud.asset.v1.IDeleteFeedRequest | undefined,
      {} | undefined
    ]
  >;
  deleteFeed(
    request: protosTypes.google.cloud.asset.v1.IDeleteFeedRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.protobuf.IEmpty,
      protosTypes.google.cloud.asset.v1.IDeleteFeedRequest | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Deletes an asset feed.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   Required. The name of the feed and it must be in the format of:
   *   projects/project_number/feeds/feed_id
   *   folders/folder_number/feeds/feed_id
   *   organizations/organization_number/feeds/feed_id
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Empty]{@link google.protobuf.Empty}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  deleteFeed(
    request: protosTypes.google.cloud.asset.v1.IDeleteFeedRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.protobuf.IEmpty,
          protosTypes.google.cloud.asset.v1.IDeleteFeedRequest | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.protobuf.IEmpty,
      protosTypes.google.cloud.asset.v1.IDeleteFeedRequest | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.protobuf.IEmpty,
      protosTypes.google.cloud.asset.v1.IDeleteFeedRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name || '',
    });
    this.initialize();
    return this._innerApiCalls.deleteFeed(request, options, callback);
  }

  exportAssets(
    request: protosTypes.google.cloud.asset.v1.IExportAssetsRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      LROperation<
        protosTypes.google.cloud.asset.v1.IExportAssetsResponse,
        protosTypes.google.cloud.asset.v1.IExportAssetsRequest
      >,
      protosTypes.google.longrunning.IOperation | undefined,
      {} | undefined
    ]
  >;
  exportAssets(
    request: protosTypes.google.cloud.asset.v1.IExportAssetsRequest,
    options: gax.CallOptions,
    callback: Callback<
      LROperation<
        protosTypes.google.cloud.asset.v1.IExportAssetsResponse,
        protosTypes.google.cloud.asset.v1.IExportAssetsRequest
      >,
      protosTypes.google.longrunning.IOperation | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Exports assets with time and resource types to a given Cloud Storage
   * location. The output format is newline-delimited JSON.
   * This API implements the {@link google.longrunning.Operation|google.longrunning.Operation} API allowing you
   * to keep track of the export.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The relative name of the root asset. This can only be an
   *   organization number (such as "organizations/123"), a project ID (such as
   *   "projects/my-project-id"), or a project number (such as "projects/12345"),
   *   or a folder number (such as "folders/123").
   * @param {google.protobuf.Timestamp} request.readTime
   *   Timestamp to take an asset snapshot. This can only be set to a timestamp
   *   between 2018-10-02 UTC (inclusive) and the current time. If not specified,
   *   the current time will be used. Due to delays in resource data collection
   *   and indexing, there is a volatile window during which running the same
   *   query may get different results.
   * @param {string[]} request.assetTypes
   *   A list of asset types of which to take a snapshot for. For example:
   *   "compute.googleapis.com/Disk". If specified, only matching assets will be
   *   returned. See [Introduction to Cloud Asset
   *   Inventory](https://cloud.google.com/asset-inventory/docs/overview)
   *   for all supported asset types.
   * @param {google.cloud.asset.v1.ContentType} request.contentType
   *   Asset content type. If not specified, no content but the asset name will be
   *   returned.
   * @param {google.cloud.asset.v1.OutputConfig} request.outputConfig
   *   Required. Output configuration indicating where the results will be output
   *   to. All results will be in newline delimited JSON format.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Operation]{@link google.longrunning.Operation}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  exportAssets(
    request: protosTypes.google.cloud.asset.v1.IExportAssetsRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          LROperation<
            protosTypes.google.cloud.asset.v1.IExportAssetsResponse,
            protosTypes.google.cloud.asset.v1.IExportAssetsRequest
          >,
          protosTypes.google.longrunning.IOperation | undefined,
          {} | undefined
        >,
    callback?: Callback<
      LROperation<
        protosTypes.google.cloud.asset.v1.IExportAssetsResponse,
        protosTypes.google.cloud.asset.v1.IExportAssetsRequest
      >,
      protosTypes.google.longrunning.IOperation | undefined,
      {} | undefined
    >
  ): Promise<
    [
      LROperation<
        protosTypes.google.cloud.asset.v1.IExportAssetsResponse,
        protosTypes.google.cloud.asset.v1.IExportAssetsRequest
      >,
      protosTypes.google.longrunning.IOperation | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent || '',
    });
    this.initialize();
    return this._innerApiCalls.exportAssets(request, options, callback);
  }
  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified folderFeed resource name string.
   *
   * @param {string} folder
   * @param {string} feed
   * @returns {string} Resource name string.
   */
  folderFeedPath(folder: string, feed: string) {
    return this._pathTemplates.folderFeedPathTemplate.render({
      folder,
      feed,
    });
  }

  /**
   * Parse the folder from FolderFeed resource.
   *
   * @param {string} folderFeedName
   *   A fully-qualified path representing folder_feed resource.
   * @returns {string} A string representing the folder.
   */
  matchFolderFromFolderFeedName(folderFeedName: string) {
    return this._pathTemplates.folderFeedPathTemplate.match(folderFeedName)
      .folder;
  }

  /**
   * Parse the feed from FolderFeed resource.
   *
   * @param {string} folderFeedName
   *   A fully-qualified path representing folder_feed resource.
   * @returns {string} A string representing the feed.
   */
  matchFeedFromFolderFeedName(folderFeedName: string) {
    return this._pathTemplates.folderFeedPathTemplate.match(folderFeedName)
      .feed;
  }

  /**
   * Return a fully-qualified organizationFeed resource name string.
   *
   * @param {string} organization
   * @param {string} feed
   * @returns {string} Resource name string.
   */
  organizationFeedPath(organization: string, feed: string) {
    return this._pathTemplates.organizationFeedPathTemplate.render({
      organization,
      feed,
    });
  }

  /**
   * Parse the organization from OrganizationFeed resource.
   *
   * @param {string} organizationFeedName
   *   A fully-qualified path representing organization_feed resource.
   * @returns {string} A string representing the organization.
   */
  matchOrganizationFromOrganizationFeedName(organizationFeedName: string) {
    return this._pathTemplates.organizationFeedPathTemplate.match(
      organizationFeedName
    ).organization;
  }

  /**
   * Parse the feed from OrganizationFeed resource.
   *
   * @param {string} organizationFeedName
   *   A fully-qualified path representing organization_feed resource.
   * @returns {string} A string representing the feed.
   */
  matchFeedFromOrganizationFeedName(organizationFeedName: string) {
    return this._pathTemplates.organizationFeedPathTemplate.match(
      organizationFeedName
    ).feed;
  }

  /**
   * Return a fully-qualified projectFeed resource name string.
   *
   * @param {string} project
   * @param {string} feed
   * @returns {string} Resource name string.
   */
  projectFeedPath(project: string, feed: string) {
    return this._pathTemplates.projectFeedPathTemplate.render({
      project,
      feed,
    });
  }

  /**
   * Parse the project from ProjectFeed resource.
   *
   * @param {string} projectFeedName
   *   A fully-qualified path representing project_feed resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromProjectFeedName(projectFeedName: string) {
    return this._pathTemplates.projectFeedPathTemplate.match(projectFeedName)
      .project;
  }

  /**
   * Parse the feed from ProjectFeed resource.
   *
   * @param {string} projectFeedName
   *   A fully-qualified path representing project_feed resource.
   * @returns {string} A string representing the feed.
   */
  matchFeedFromProjectFeedName(projectFeedName: string) {
    return this._pathTemplates.projectFeedPathTemplate.match(projectFeedName)
      .feed;
  }

  /**
   * Terminate the GRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   */
  close(): Promise<void> {
    this.initialize();
    if (!this._terminated) {
      return this.assetServiceStub!.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}
