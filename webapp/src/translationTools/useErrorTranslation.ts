import { useTranslate } from '@tolgee/react';

export function useErrorTranslation() {
  const { t } = useTranslate();

  return (code: string, params?: string[]) => {
    switch (code.toLocaleLowerCase()) {
      // from 'ApiHttpService.tsx'
      case 'authentication_cancelled':
        return t('authentication_cancelled');

      case 'bad_credentials':
        return t('bad_credentials');
      case 'invalid_otp_code':
        return t('invalid_otp_code');
      case 'invitation_code_does_not_exist_or_expired':
        return t('invitation_code_does_not_exist_or_expired');
      case 'language_tag_exists':
        return t('language_tag_exists');
      case 'language_name_exists':
        return t('language_name_exists');
      case 'operation_not_permitted':
        return t('operation_not_permitted');
      case 'registrations_not_allowed':
        return t('registrations_not_allowed');
      case 'key_exists':
        return t('key_exists');
      case 'third_party_auth_error_message':
        return t('third_party_auth_error_message');
      case 'third_party_auth_non_matching_email':
        return t('third_party_auth_non_matching_email');
      case 'third_party_switch_initiated':
        return t('third_party_switch_initiated');
      case 'third_party_switch_conflict':
        return t('third_party_switch_conflict');
      case 'username_already_exists':
        return t('username_already_exists');
      case 'user_already_has_permissions':
        return t('user_already_has_permissions');
      case 'user_already_has_role':
        return t('user_already_has_role');
      case 'file_too_big':
        return t('file_too_big');
      case 'email_not_verified':
        return t('email_not_verified');
      case 'missing_callback_url':
        return t('missing_callback_url');
      case 'expired_jwt_token':
        return t('expired_jwt_token');
      case 'organization_has_no_other_owner':
        return t('organization_has_no_other_owner');
      case 'existing_language_not_selected':
        return t('existing_language_not_selected');
      case 'conflict_is_not_resolved':
        return t('conflict_is_not_resolved');
      case 'request_parse_error':
        return t('request_parse_error');
      case 'invalid_recaptcha_token':
        return t('invalid_recaptcha_token');
      case 'no_exported_result':
        return t('no_exported_result');
      case 'email_already_invited_or_member':
        return t('email_already_invited_or_member');
      case 'validation_email_is_not_valid':
        return t('validation_email_is_not_valid');
      case 'wrong_current_password':
        return t('wrong_current_password');
      case 'unexpected_error_occurred':
        return t('unexpected_error_occurred');
      case 'feature_not_enabled':
        return t('feature_not_enabled');
      case 'license_key_not_found':
        return t('license_key_not_found');
      case 'plan_translation_limit_exceeded':
        return t('plan_translation_limit_exceeded');
      case 'organization_already_subscribed':
        return t('organization_already_subscribed');
      case 'user_has_no_project_access':
        return t('user_has_no_project_access');
      case 'translation_spending_limit_exceeded':
        return t('translation_spending_limit_exceeded');
      case 'seats_spending_limit_exceeded':
        return t('seats_spending_limit_exceeded');
      case 'mt_service_not_enabled':
        return t('mt_service_not_enabled');
      case 'out_of_credits':
        return t('out_of_credits');
      case 'key_exists_in_namespace':
        return t('key_exists_in_namespace');
      case 'translation_api_rate_limit':
        return t('translation_api_rate_limit');
      case 'translation_failed':
        return t('translation_failed');
      case 'language_not_supported_by_service':
        return t('language_not_supported_by_service');
      case 'formality_not_supported_by_service':
        return t('formality_not_supported_by_service');
      case 'cannot_modify_disabled_translation':
        return t('cannot_modify_disabled_translation');
      case 'invalid_connection_string':
        return t('invalid_connection_string');
      case 'content_storage_config_invalid':
        return t('content_storage_config_invalid');
      case 'content_storage_test_failed':
        return t('content_storage_test_failed');
      case 'content_storage_is_in_use':
        return t('content_storage_is_in_use');
      case 'plan_has_subscribers':
        return t('plan_has_subscribers');
      case 'cannot_store_file_to_content_storage':
        return t('cannot_store_file_to_content_storage');
      case 'unexpected_error_while_publishing_to_content_storage':
        return t('unexpected_error_while_publishing_to_content_storage');
      case 'webhook_responded_with_non_200_status':
        return t('webhook_responded_with_non_200_status');
      case 'unexpected_error_while_executing_webhook':
        return t('unexpected_error_while_executing_webhook');
      case 'resource_not_found':
        return t('resource_not_found');
      case 'subscription_already_canceled':
        return t('subscription_already_canceled');
      case 'credit_spending_limit_exceeded':
        return t('credit_spending_limit_exceeded');
      case 'subscription_not_active':
        return t('subscription_not_active');
      case 'invalid_plural_form':
        return t('invalid_plural_form');
      case 'slack_not_configured':
        return t('slack_not_configured');
      case 'slack_workspace_already_connected':
        return t('slack_workspace_already_connected');
      case 'email_already_verified':
        return t('verify_email_already_verified');
      case 'email_verification_code_not_valid':
        return t('verify_email_verification_code_not_valid');
      case 'user_is_subscribed_to_paid_plan':
        return t('user_is_subscribed_to_paid_plan');
      case 'sso_token_exchange_failed':
        return t('sso_token_exchange_failed');
      case 'sso_user_info_retrieval_failed':
        return t('sso_user_info_retrieval_failed');
      case 'sso_id_token_expired':
        return t('sso_id_token_expired');
      case 'sso_user_cannot_create_organization':
        return t('sso_user_cannot_create_organization');
      case 'sso_cant_verify_user':
        return t('sso_cant_verify_user');
      case 'sso_auth_missing_domain':
        return t('sso_auth_missing_domain');
      case 'sso_domain_not_found_or_disabled':
        return t('sso_domain_not_found_or_disabled');
      case 'native_authentication_disabled':
        return t('native_authentication_disabled');
      case 'operation_unavailable_for_account_type':
        return t('operation_unavailable_for_account_type');
      case 'invitation_organization_mismatch':
        return t('invitation_organization_mismatch');
      case 'user_is_managed_by_organization':
        return t('user_is_managed_by_organization');
      case 'cannot_set_sso_provider_missing_fields':
        return t('cannot_set_sso_provider_missing_fields');
      case 'namespace_cannot_be_used_when_feature_is_disabled':
        return t('namespace_cannot_be_used_when_feature_is_disabled');
      case 'namespaces_cannot_be_disabled_when_namespace_exists':
        return t('namespaces_cannot_be_disabled_when_namespace_exists');
      case 'sso_domain_not_allowed':
        return t('sso_domain_not_allowed');
      case 'sso_login_forced_for_this_account':
        return t('sso_login_forced_for_this_account');
      case 'use_sso_for_authentication_instead':
        return t('use_sso_for_authentication_instead');
      case 'user_missing_password':
        return t('user_missing_password');
      case 'invalid_jwt_token':
        return t('expired_jwt_token');
      case 'free_self_hosted_seat_limit_exceeded':
        return t('free_self_hosted_seat_limit_exceeded');
      case 'plan_seat_limit_exceeded':
        return t('plan_seat_limit_exceeded');
      case 'llm_provider_not_found':
        return t('llm_provider_not_found', { value: params?.[0] || '' });
      case 'llm_provider_error':
        return t('llm_provider_error', { value: params?.[0] || '' });
      case 'llm_template_parsing_error':
        return t('llm_template_parsing_error', {
          value: params?.[0] || '',
          line: params?.[1] || '',
          column: params?.[2] || '',
        });
      case 'llm_rate_limited':
        return t('llm_rate_limited');
      case 'llm_provider_not_returned_json':
        return t('llm_provider_not_returned_json');
      case 'prompt_not_found':
        return t('prompt_not_found');
      case 'llm_content_filter':
        return t('llm_content_filter');
      case 'llm_provider_empty_response':
        return t('llm_provider_empty_response');
      default:
        return code;
    }
  };
}
