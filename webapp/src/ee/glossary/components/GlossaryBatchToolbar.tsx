import {
  Card,
  Checkbox,
  MenuItem,
  Select,
  styled,
  Typography,
} from '@mui/material';
import React from 'react';
import LoadingButton from 'tg.component/common/form/LoadingButton';
import { ChevronRight } from '@untitled-ui/icons-react';
import { useApiMutation } from 'tg.service/http/useQueryApi';
import { confirmation } from 'tg.hooks/confirmation';
import { T } from '@tolgee/react';
import { SelectionService } from 'tg.service/useSelectionService';
import { messageService } from 'tg.service/MessageService';
import { TranslatedError } from 'tg.translationTools/TranslatedError';
import { usePreferredOrganization } from 'tg.globalContext/helpers';
import { useGlossary } from 'tg.ee.module/glossary/hooks/useGlossary';

const StyledCard = styled(Card)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(1.5)};
  padding: ${({ theme }) => theme.spacing(1, 1.5)};
  margin: ${({ theme }) => theme.spacing(2, 1)};
  margin-left: ${({ theme }) => theme.spacing(5)};
  border-radius: ${({ theme }) => theme.spacing(1)};
  background-color: ${({ theme }) =>
    theme.palette.mode === 'dark'
      ? theme.palette.emphasis[200]
      : theme.palette.emphasis[50]};
  transition: background-color 300ms ease-in-out, visibility 0ms;
  -webkit-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
`;

const StyledCheckbox = styled(Checkbox)`
  margin: ${({ theme }) => theme.spacing(0, -1.5, 0, -1)};
`;

type Props = {
  selectionService: SelectionService<number>;
};

export const GlossaryBatchToolbar: React.VFC<Props> = ({
  selectionService,
}) => {
  const { preferredOrganization } = usePreferredOrganization();
  const glossary = useGlossary();

  const deleteSelectedMutation = useApiMutation({
    url: '/v2/organizations/{organizationId}/glossaries/{glossaryId}/terms',
    method: 'delete',
    invalidatePrefix:
      '/v2/organizations/{organizationId}/glossaries/{glossaryId}/terms',
  });

  const onDeleteSelected = () => {
    confirmation({
      title: <T keyName="glossary_term_batch_delete_confirmation_title" />,
      message: (
        <T
          keyName="glossary_term_batch_delete_confirmation_message"
          params={{ count: selectionService.selected.length }}
        />
      ),
      onConfirm: () => {
        deleteSelectedMutation.mutate(
          {
            path: {
              organizationId: preferredOrganization!.id,
              glossaryId: glossary.id,
            },
            content: {
              'application/json': {
                termIds: selectionService.selected,
              },
            },
          },
          {
            onSuccess() {
              selectionService.unselectAll();
            },
            onError(e) {
              messageService.error(
                <TranslatedError code={e.code || 'unexpected_error_occurred'} />
              );
            },
          }
        );
      },
    });
  };

  const canDelete = ['OWNER', 'MAINTAINER'].includes(
    preferredOrganization?.currentUserRole || ''
  );

  return (
    <StyledCard
      sx={{
        visibility: selectionService.selected.length > 0 ? 'visible' : 'hidden',
      }}
    >
      <StyledCheckbox
        size="small"
        checked={selectionService.isAllSelected}
        onChange={selectionService.toggleSelectAll}
        indeterminate={selectionService.isSomeSelected}
        disabled={selectionService.isLoading}
      />
      <Typography>{`${selectionService.selected.length} / ${selectionService.total}`}</Typography>
      <Select variant="outlined" size="small" value={0} sx={{ minWidth: 250 }}>
        <MenuItem value={0}>Delete terms</MenuItem>
      </Select>
      <LoadingButton
        disableElevation
        disabled={!canDelete}
        variant="contained"
        color="primary"
        sx={{ minWidth: 0, minHeight: 0, width: 40, height: 40, padding: 0 }}
        loading={deleteSelectedMutation.isLoading || selectionService.isLoading}
        onClick={onDeleteSelected}
        data-cy="glossary-batch-delete-button"
      >
        <ChevronRight width={20} height={20} />
      </LoadingButton>
    </StyledCard>
  );
};
