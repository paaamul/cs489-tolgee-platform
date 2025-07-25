import { LINKS, PARAMS } from 'tg.constants/links';
import React, { useState } from 'react';
import { BaseOrganizationSettingsView } from 'tg.views/organizations/components/BaseOrganizationSettingsView';
import { useTranslate } from '@tolgee/react';
import { useOrganization } from 'tg.views/organizations/useOrganization';
import { useApiQuery } from 'tg.service/http/useQueryApi';
import { GlossaryCreateDialog } from 'tg.ee.module/glossary/views/GlossaryCreateDialog';
import { GlossaryListItem } from 'tg.ee.module/glossary/components/GlossaryListItem';
import { Box, styled } from '@mui/material';
import { PaginatedHateoasList } from 'tg.component/common/list/PaginatedHateoasList';
import { GlossariesEmptyListMessage } from 'tg.ee.module/glossary/components/GlossariesEmptyListMessage';
import { useEnabledFeatures } from 'tg.globalContext/helpers';
import { DisabledFeatureBanner } from 'tg.component/common/DisabledFeatureBanner';

const StyledWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  & .listWrapper > * > * + * {
    border-top: 1px solid ${({ theme }) => theme.palette.divider1};
  }
`;

export const GlossariesListView = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const { isEnabled } = useEnabledFeatures();
  const glossaryFeatureEnabled = isEnabled('GLOSSARY');

  const organization = useOrganization();

  const { t } = useTranslate();

  const glossaries = useApiQuery({
    url: '/v2/organizations/{organizationId}/glossaries-with-stats',
    method: 'get',
    path: { organizationId: organization!.id },
    query: {
      page,
      size: 20,
      search,
      sort: ['id,desc'],
    },
    options: {
      enabled: glossaryFeatureEnabled,
      keepPreviousData: true,
    },
  });

  const items = glossaries?.data?._embedded?.glossaries;
  const showSearch = search || (glossaries.data?.page?.totalElements ?? 0) > 5;

  const onCreate = () => {
    setCreateDialogOpen(true);
  };

  const canCreate = ['OWNER', 'MAINTAINER'].includes(
    organization?.currentUserRole || ''
  );

  return (
    <StyledWrapper>
      <BaseOrganizationSettingsView
        windowTitle={t('organization_glossaries_title')}
        title={t('organization_glossaries_title')}
        onSearch={showSearch ? setSearch : undefined}
        searchPlaceholder={t('glossaries_search_placeholder')}
        link={LINKS.ORGANIZATION_GLOSSARIES}
        navigation={[
          [
            t('organization_glossaries_title'),
            LINKS.ORGANIZATION_GLOSSARIES.build({
              [PARAMS.ORGANIZATION_SLUG]: organization!.slug,
            }),
          ],
        ]}
        loading={glossaryFeatureEnabled && glossaries.isLoading}
        hideChildrenOnLoading={false}
        maxWidth={1000}
        allCentered
        onAdd={canCreate && items ? onCreate : undefined}
        addLabel={t('glossaries_add_button')}
      >
        {canCreate && createDialogOpen && (
          <GlossaryCreateDialog
            open={createDialogOpen}
            onClose={() => setCreateDialogOpen(false)}
            onFinished={() => setCreateDialogOpen(false)}
          />
        )}
        {glossaryFeatureEnabled ? (
          <PaginatedHateoasList
            wrapperComponentProps={{ className: 'listWrapper' }}
            onPageChange={setPage}
            loadable={glossaries}
            renderItem={(g) => <GlossaryListItem key={g.id} glossary={g} />}
            emptyPlaceholder={
              <GlossariesEmptyListMessage
                loading={glossaries.isFetching}
                onCreateClick={canCreate ? onCreate : undefined}
              />
            }
          />
        ) : (
          <Box>
            <DisabledFeatureBanner
              customMessage={t('glossaries_feature_description')}
            />
          </Box>
        )}
      </BaseOrganizationSettingsView>
    </StyledWrapper>
  );
};
