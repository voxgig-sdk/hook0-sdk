# Hook0 SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

Hook0Utility.registrar = ->(u) {
  u.clean = Hook0Utilities::Clean
  u.clean_add = Hook0Utilities::CleanAdd
  u.clean_explain = Hook0Utilities::CleanExplain
  u.done = Hook0Utilities::Done
  u.make_error = Hook0Utilities::MakeError
  u.feature_add = Hook0Utilities::FeatureAdd
  u.feature_hook = Hook0Utilities::FeatureHook
  u.feature_init = Hook0Utilities::FeatureInit
  u.fetcher = Hook0Utilities::Fetcher
  u.make_fetch_def = Hook0Utilities::MakeFetchDef
  u.make_context = Hook0Utilities::MakeContext
  u.make_options = Hook0Utilities::MakeOptions
  u.make_request = Hook0Utilities::MakeRequest
  u.make_response = Hook0Utilities::MakeResponse
  u.make_result = Hook0Utilities::MakeResult
  u.make_point = Hook0Utilities::MakePoint
  u.make_spec = Hook0Utilities::MakeSpec
  u.make_url = Hook0Utilities::MakeUrl
  u.param = Hook0Utilities::Param
  u.prepare_auth = Hook0Utilities::PrepareAuth
  u.prepare_body = Hook0Utilities::PrepareBody
  u.prepare_headers = Hook0Utilities::PrepareHeaders
  u.prepare_method = Hook0Utilities::PrepareMethod
  u.prepare_params = Hook0Utilities::PrepareParams
  u.prepare_path = Hook0Utilities::PreparePath
  u.prepare_query = Hook0Utilities::PrepareQuery
  u.graphql_body = Hook0Utilities::GraphqlBody
  u.graphql_errors = Hook0Utilities::GraphqlErrors
  u.result_basic = Hook0Utilities::ResultBasic
  u.result_body = Hook0Utilities::ResultBody
  u.result_headers = Hook0Utilities::ResultHeaders
  u.transform_request = Hook0Utilities::TransformRequest
  u.transform_response = Hook0Utilities::TransformResponse
}
