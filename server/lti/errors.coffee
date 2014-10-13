class ConsumerError extends Error
  constructor: ->
    super
class StoreError extends Error
  constructor: ->
    super
class ParameterError extends Error
  constructor: ->
    super
class SignatureError extends Error
  constructor: ->
    super
class NonceError extends Error
  constructor: ->
    super

exports =
  ConsumerError: ConsumerError
  StoreError: StoreError
  ParameterError: ParameterError
  SignatureError: SignatureError
  NonceError: NonceError
